import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { TaskCreateRequest } from './contracts/task.create.request';
import { TaskDto } from './dto/task.dto';
import { TaskUpdateRequest } from './contracts/task.update.request';
import { HttpService } from '@nestjs/axios';
import { TaskModel } from './models/task.model';

@Injectable()
export class TaskService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly http: HttpService,
  ) {}

  async patch(params: { id: string; data: TaskUpdateRequest }) {
    const { id, data } = params;

    return this.prisma.task.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(params: { id: string }) {
    const { id } = params;

    const c = await this.task({ id });

    if (c == null) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }

    return this.prisma.task.delete({
      where: {
        id,
      },
    });
  }

  async task(where: Prisma.TaskWhereUniqueInput): Promise<TaskDto> {
    const db = await this.prisma.task.findUnique({
      where,
    });

    const result: TaskDto = {
      ...db,
    };

    return result;
  }

  async tasks(where: Prisma.TaskWhereInput): Promise<TaskModel[]> {
    return this.prisma.task.findMany({
      where,
    });
  }

  async create(dto: TaskCreateRequest): Promise<TaskModel> {
    return this.prisma.task.create({
      data: {
        ...dto,
      },
    });
  }
}
