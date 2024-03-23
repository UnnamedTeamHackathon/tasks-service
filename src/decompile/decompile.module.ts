import { Module } from '@nestjs/common';
import { DecompileService } from './decompile.service';
import { DecompileController } from './decompile.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [DecompileService],
  controllers: [DecompileController],
  imports: [PrismaModule],
  exports: [DecompileService],
})
export class DecompileModule {}
