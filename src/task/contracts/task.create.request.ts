import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { DecompileCreateRequest } from 'src/decompile/contracts/decompile.create.request';

export class TaskCreateRequest {
  @ApiProperty({
    enum: ['cryptography', 'reverse', 'web', 'forensic', 'steganoraphy'],
    type: String,
  })
  type: $Enums.TaskType;

  @ApiProperty({
    enum: ['easy', 'normal', 'hard', 'very_hard'],
    type: String,
  })
  difficulty: $Enums.TaskDifficulty;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  points: number;

  @ApiProperty()
  task: DecompileCreateRequest;
}
