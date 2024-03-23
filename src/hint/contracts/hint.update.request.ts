import { ApiProperty } from '@nestjs/swagger';

export class HintUpdateRequest {
  @ApiProperty()
  text?: string;

  @ApiProperty()
  file_url?: string;

  @ApiProperty()
  image_url?: string;
}
