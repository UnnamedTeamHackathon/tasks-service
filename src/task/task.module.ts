import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TaskController } from './task.controller';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [TaskService],
  imports: [PrismaModule, AuthModule, JwtModule],
  controllers: [TaskController],
  exports: [TaskService],
})
export class TaskModule {}
