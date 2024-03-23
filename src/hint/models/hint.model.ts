import { Hint } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class HintModel implements Hint {
  @ApiProperty()
  id: string;

  @ApiProperty()
  text: string;

  @ApiProperty()
  file_url: string;

  @ApiProperty()
  image_url: string;

  @ApiProperty()
  task_id: string;
}
