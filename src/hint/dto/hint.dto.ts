import { ApiProperty } from '@nestjs/swagger';

export class HintDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  text: string;

  @ApiProperty()
  file_url: string;

  @ApiProperty()
  image_url: string;
}
