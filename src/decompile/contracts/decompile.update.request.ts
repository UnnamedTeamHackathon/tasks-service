import { ApiProperty } from '@nestjs/swagger';

export class DecompileUpdateRequest {
  @ApiProperty()
  file_url?: string;

  @ApiProperty()
  answer?: string;
}
