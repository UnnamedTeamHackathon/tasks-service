import { ApiProperty } from '@nestjs/swagger';
import { DecompileTask } from '@prisma/client';

export class DecompileTaskModel implements DecompileTask {
  @ApiProperty()
  file_url: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  task_id: string;

  @ApiProperty()
  answer: string;
}
