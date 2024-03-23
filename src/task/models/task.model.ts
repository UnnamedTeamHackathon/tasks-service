import { $Enums, Task } from '@prisma/client';
import { DecompileTaskModel } from 'src/decompile/models/decompile.task.model';

export class TaskModel implements Task {
  type: $Enums.TaskType;
  difficulty: $Enums.TaskDifficulty;
  id: string;
  title: string;
  description: string;
  points: number;
  task: DecompileTaskModel;
}
