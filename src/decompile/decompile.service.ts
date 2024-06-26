import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DecompileService {
  constructor(private readonly prisma: PrismaService) {}

  async answer(params: { id: string; answer: string }): Promise<boolean> {
    const { id, answer } = params;

    const candidate = await this.prisma.task.findUnique({
      where: {
        id,
      },
    });

    if (candidate == null) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }

    return candidate.answer === answer;
  }
}
