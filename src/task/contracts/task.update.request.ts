import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { DecompileUpdateRequest } from 'src/decompile/contracts/decompile.update.request';

export class TaskUpdateRequest {
  @ApiProperty({
    enum: ['cryptography', 'reverse', 'web', 'forensic', 'steganoraphy'],
    type: String,
  })
  type?: $Enums.TaskType;

  @ApiProperty({
    enum: ['easy', 'normal', 'hard', 'very_hard'],
    type: String,
  })
  difficulty?: $Enums.TaskDifficulty;

  @ApiProperty()
  title?: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  points?: number;

  @ApiProperty()
  task?: DecompileUpdateRequest;
}
