import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { PrismaModule } from './prisma/prisma.module';
import { DecompileModule } from './decompile/decompile.module';
import { ServerModule } from './server/server.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TaskModule,
    PrismaModule,
    DecompileModule,
    ServerModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'swagger'),
      serveStaticOptions: {},
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
