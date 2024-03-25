import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { PrismaModule } from './prisma/prisma.module';
import { DecompileModule } from './decompile/decompile.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { HttpModule } from '@nestjs/axios';
import { HintModule } from './hint/hint.module';

@Module({
  imports: [
    TaskModule,
    PrismaModule,
    DecompileModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'swagger'),
      serveStaticOptions: {},
    }),
    AuthModule,
    UsersModule,
    HttpModule,
    HintModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
