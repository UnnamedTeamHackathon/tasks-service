import { Inject, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { DecompileService } from 'src/decompile/decompile.service';
import { DecompileAnswerResultDto } from 'src/decompile/dto/decompile.answer.dto';
import { PointsDto } from './dto/points.dto';
import { ClientKafka } from '@nestjs/microservices';
import { TaskCompletedMessage } from './messages/task-completed.message';
import { PointsMessage } from './messages/points.message';
import { TopMessage } from './messages/top.message';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly decompile: DecompileService,
    @Inject('AWARD_PRODUCER') private readonly client: ClientKafka,
  ) {
    this.client.connect().then((value) => console.log(value));
  }

  async sumPoints(): Promise<PointsDto[]> {
    const query: any[] = await this.prisma
      .$queryRaw`select u.id as id, sum(t.points) as points
    from "Task" t
             join "_TaskToUser" tu on t.id = tu."A"
             join "User" u on tu."B" = u.id
    group by u.id
    order by points;`;

    return query.map((p) => {
      return {
        id: p.id,
        points: Number(p.points),
      };
    });
  }

  async points(params: { userId: string }): Promise<PointsDto> {
    const { userId } = params;

    const points = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        completed_tasks: {
          select: {
            points: true,
          },
        },
      },
    });

    return {
      id: userId,
      points: points.completed_tasks.reduce(
        (elem, next) => elem + next.points,
        0,
      ),
    };
  }

  private async sendTaskCompletedMessage(message: TaskCompletedMessage) {
    this.client.emit('award.daily', message);
    this.client.emit('award.flawless', message);
    this.client.emit('award.weekend', message);
    this.client.emit('award.total_tasks', message);
  }

  private async sendPointsMessage(message: PointsMessage) {
    this.client.emit('award.total_points', message);
  }

  private async sendTopMessage(message: TopMessage) {
    this.client.emit('award.top', message);
  }

  private async sendEverything(params: { userId: string; valid: boolean }) {
    const { userId, valid } = params;

    this.sendTaskCompletedMessage({ userId, valid, timestamp: new Date() });

    const points = await this.points({ userId });

    this.sendPointsMessage({
      userId,
      points: points.points,
    });

    const top = await this.sumPoints();
    const rank = top.indexOf(top.filter((dto) => dto.id == userId).at(0));

    this.sendTopMessage({
      userId,
      rank,
    });
  }

  async tryCompleteTask(params: {
    userId: string;
    taskId: string;
    answer: string;
  }): Promise<DecompileAnswerResultDto> {
    const { userId, taskId, answer } = params;

    const candidate = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (candidate == null) {
      await this.prisma.user.create({
        data: {
          id: userId,
        },
      });
    }

    const result = await this.decompile.answer({
      id: taskId,
      answer,
    });

    if (!result) {
      await this.sendEverything({
        userId,
        valid: false,
      });

      return {
        decompile_id: taskId,
        answer,
        valid: false,
      };
    }

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        completed_tasks: {
          connect: {
            id: taskId,
          },
        },
      },
      include: {
        completed_tasks: true,
      },
    });

    await this.sendEverything({
      userId,
      valid: true,
    });

    return {
      decompile_id: taskId,
      answer,
      valid: true,
    };
  }

  async user(params: { id: string }): Promise<UserDto> {
    const { id } = params;

    return this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        completed_tasks: true,
      },
    });
  }

  async completeTask(params: {
    userId: string;
    taskId: string;
  }): Promise<UserDto> {
    const { userId, taskId } = params;

    const candidate = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (candidate == null) {
      await this.prisma.user.create({
        data: {
          id: userId,
        },
      });
    }

    const res = this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        completed_tasks: {
          connect: {
            id: taskId,
          },
        },
      },
      include: {
        completed_tasks: true,
      },
    });

    await this.sendEverything({
      userId,
      valid: true,
    });

    return res;
  }
}
