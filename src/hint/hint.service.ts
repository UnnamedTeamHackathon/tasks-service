import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { HttpService } from '@nestjs/axios';
import { Prisma } from '@prisma/client';
import { HintUpdateRequest } from './contracts/hint.update.request';
import { HintDto } from './dto/hint.dto';
import { HintModel } from './models/hint.model';
import { HintCreateRequest } from './contracts/hint.create.request';

@Injectable()
export class HintService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly http: HttpService,
  ) {}

  async patch(params: {
    where: Prisma.HintWhereUniqueInput;
    data: HintUpdateRequest;
  }) {
    const { where, data } = params;

    return this.prisma.hint.update({
      where,
      data,
    });
  }

  async delete(params: { where: Prisma.HintWhereUniqueInput }) {
    const { where } = params;

    const c = await this.hint(where);

    if (c == null) {
      throw new HttpException('Hint not found', HttpStatus.NOT_FOUND);
    }

    return this.prisma.hint.delete({
      where,
    });
  }

  async hint(where: Prisma.HintWhereUniqueInput): Promise<HintDto> {
    const db = await this.prisma.hint.findUnique({
      where,
    });

    return {
      ...db,
    };
  }

  async hints(): Promise<HintModel[]> {
    return this.prisma.hint.findMany();
  }

  async create(dto: HintCreateRequest): Promise<HintModel> {
    return this.prisma.hint.create({
      data: {
        ...dto,
      },
    });
  }
}
