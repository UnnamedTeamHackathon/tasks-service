import { Module } from '@nestjs/common';
import { HintService } from './hint.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
import { HintController } from './hint.controller';

@Module({
  providers: [HintService],
  imports: [PrismaModule, AuthModule, JwtModule, HttpModule],
  controllers: [HintController],
  exports: [HintService],
})
export class HintModule {}
