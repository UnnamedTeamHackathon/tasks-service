import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TaskController } from './task.controller';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [TaskService],
  imports: [PrismaModule, AuthModule, JwtModule, HttpModule],
  controllers: [TaskController],
  exports: [TaskService],
})
export class TaskModule {}
