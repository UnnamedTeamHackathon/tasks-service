import { Module } from '@nestjs/common';
import { DecompileService } from './decompile.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [DecompileService],
  controllers: [],
  imports: [PrismaModule],
  exports: [DecompileService],
})
export class DecompileModule {}
