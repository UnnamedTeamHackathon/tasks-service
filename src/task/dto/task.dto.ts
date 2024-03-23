import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { DecompileTaskModel } from 'src/decompile/models/decompile.task.model';

export class TaskDto {
  @ApiProperty()
  id: string;

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
  file_url: string;

  //@ApiProperty()
  //answer: string;
}
