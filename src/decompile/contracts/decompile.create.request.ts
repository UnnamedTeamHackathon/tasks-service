import { ApiProperty } from '@nestjs/swagger';

export class DecompileCreateRequest {
  @ApiProperty()
  file_url: string;

  @ApiProperty()
  answer: string;
}
