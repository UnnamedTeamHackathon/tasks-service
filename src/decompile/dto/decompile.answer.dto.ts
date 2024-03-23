import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class DecompileAnswerResultDto {
  @IsUUID()
  @ApiProperty()
  decompile_id: string;

  @ApiProperty()
  answer: string;

  @ApiProperty()
  valid: boolean;
}
