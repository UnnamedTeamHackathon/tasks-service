import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { TaskCreateRequest } from './contracts/task.create.request';
import { TaskDto } from './dto/task.dto';
import { TaskUpdateRequest } from './contracts/task.update.request';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async patch(params: { id: string, data: TaskUpdateRequest }) {
    const { id, data } = params;

    return this.prisma.task.update({
      where: {
        id,
      },
      data: {
        title: data.title,
        description: data.description,
        difficulty: data.difficulty,
        type: data.type,
        points: data.points,
        task: {
          update: {
            answer: data.task.answer,
            file_url: data.task.file_url,
          },
        },
      },
      include: {
        task: true,
      },
    });
  }

  async delete(params: { id: string }) {
    const { id } = params;

    return this.prisma.task.delete({
      where: {
        id,
      },
      include: {
        task: true,
      },
    });
  }

  async task(
    where: Prisma.TaskWhereUniqueInput,
    include?: Prisma.TaskInclude,
  ): Promise<TaskDto> {
    return this.prisma.task.findUnique({
      where,
      include,
    });
  }

  async tasks(): Promise<TaskDto[]> {
    return this.prisma.task.findMany();
  }

  async create(dto: TaskCreateRequest): Promise<TaskDto> {
    return this.prisma.task.create({
      data: {
        title: dto.title,
        type: dto.type,
        description: dto.description,
        difficulty: dto.difficulty,
        points: dto.points,
        task: {
          create: {
            file_url: dto.task.file_url,
            answer: dto.task.answer,
          },
        },
      },
      include: {
        task: true,
      },
    });
  }
}
