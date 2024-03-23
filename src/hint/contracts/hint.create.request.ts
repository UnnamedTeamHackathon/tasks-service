import { ApiProperty } from '@nestjs/swagger';

export class HintCreateRequest {
  @ApiProperty()
  task_id: string;

  @ApiProperty()
  text: string;

  @ApiProperty()
  file_url: string;

  @ApiProperty()
  image_url: string;
}
