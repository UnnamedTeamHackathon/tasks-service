import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
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
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/roles/role.guard';
import { Roles } from '../auth/roles/role.decorator';
import { Role } from '../auth/roles/role.enum';
import { HintService } from './hint.service';
import { HintUpdateRequest } from './contracts/hint.update.request';
import { HintDto } from './dto/hint.dto';
import { HintCreateRequest } from './contracts/hint.create.request';

@ApiBearerAuth('jwt')
@ApiTags('Hints')
@Controller('hint')
export class HintController {
  constructor(private readonly service: HintService) {}

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Admin)
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: HintUpdateRequest,
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
    type: HintDto,
    isArray: true,
  })
  @Get()
  async hints() {
    return this.service.hints();
  }

  @ApiOkResponse({
    type: HintDto,
  })
  @ApiParam({
    name: 'id',
    type: String,
    format: 'uuid',
  })
  @Get(':id')
  async hint(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.hint({
      id,
    });
  }

  @ApiOkResponse({
    type: HintDto,
  })
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Admin)
  @Post()
  async create(@Body() request: HintCreateRequest) {
    return this.service.create(request);
  }
}
