import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { DecompileService } from 'src/decompile/decompile.service';
import { DecompileAnswerResultDto } from 'src/decompile/dto/decompile.answer.dto';
import { PointsDto } from './dto/points.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly decompile: DecompileService,
  ) {}

  async sumPoints(): Promise<PointsDto[]> {
    const query: any[] = await this.prisma
      .$queryRaw`select u.id as id, sum(t.points) as points
    from "Task" t
             join "_TaskToUser" tu on t.id = tu."A"
             join "User" u on tu."B" = u.id
    group by u.id;`;

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

    return this.prisma.user.update({
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
  }
}
