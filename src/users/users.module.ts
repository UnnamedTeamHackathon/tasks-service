import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { DecompileModule } from 'src/decompile/decompile.module';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [PrismaModule, JwtModule, DecompileModule],
})
export class UsersModule {}
