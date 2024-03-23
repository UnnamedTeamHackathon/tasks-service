import { ApiProperty } from '@nestjs/swagger';

export class DecompileTaskModel {
  @ApiProperty()
  file_url: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  task_id: string;

  @ApiProperty()
  answer: string;
}
