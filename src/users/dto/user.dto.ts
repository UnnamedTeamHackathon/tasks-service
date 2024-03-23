import { ApiProperty } from '@nestjs/swagger';
import { TaskDto } from 'src/task/dto/task.dto';

export class UserDto {
  @ApiProperty()
  id: string;

  @ApiProperty({
    type: TaskDto,
    isArray: true,
  })
  completed_tasks: TaskDto[];
}
