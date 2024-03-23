import { ApiProperty } from '@nestjs/swagger';

export class DecompileAnswerRequest {
  @ApiProperty()
  answer: string;
}
