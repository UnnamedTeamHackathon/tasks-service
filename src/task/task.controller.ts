import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskCreateRequest } from './contracts/task.create.request';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { TaskDto } from './dto/task.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RoleGuard } from 'src/auth/roles/role.guard';
import { Role } from 'src/auth/roles/role.enum';
import { Roles } from 'src/auth/roles/role.decorator';
import { TaskUpdateRequest } from './contracts/task.update.request';

@ApiBearerAuth('jwt')
@ApiTags('Tasks')
@Controller('task')
export class TaskController {
  constructor(private readonly service: TaskService) {}

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Admin)
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: TaskUpdateRequest,
  ) {
    return this.service.patch({ id, data });
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.delete({ id });
  }

  @ApiOkResponse({
    type: TaskDto,
    isArray: true,
  })
  @Get()
  async tasks() {
    return this.service.tasks();
  }

  @ApiOkResponse({
    type: TaskDto,
  })
  @ApiParam({
    name: 'id',
    type: String,
    format: 'uuid',
  })
  @Get(':id')
  async task(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.task({
      id,
    });
  }

  @ApiOkResponse({
    type: TaskDto,
  })
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Admin)
  @Post()
  async create(@Body() request: TaskCreateRequest) {
    return this.service.create(request);
  }
}
