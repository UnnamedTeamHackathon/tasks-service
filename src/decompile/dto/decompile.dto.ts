import { ApiProperty } from '@nestjs/swagger';

export class DecompileTaskDto {
  @ApiProperty()
  file_url: string;

  @ApiProperty()
  id: string;
}
