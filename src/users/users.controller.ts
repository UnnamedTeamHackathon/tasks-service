import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Role } from 'src/auth/roles/role.enum';
import { Roles } from 'src/auth/roles/role.decorator';
import { DecompileAnswerRequest } from 'src/decompile/contracts/decompile.answer.request';
import { DecompileAnswerResultDto } from 'src/decompile/dto/decompile.answer.dto';
import { PointsDto } from './dto/points.dto';

@ApiBearerAuth('jwt')
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly user: UsersService) {}

  @ApiOkResponse({
    type: UserDto,
    isArray: true,
  })
  @Get('points')
  async allPoints() {
    return this.user.sumPoints();
  }

  @ApiOkResponse({
    type: UserDto,
  })
  @Get(':id')
  async get(@Param('id', ParseUUIDPipe) id: string) {
    return this.user.user({ id });
  }

  @ApiOkResponse({
    type: PointsDto,
  })
  @Get(':id/points')
  async getPoints(@Param('id', ParseUUIDPipe) id: string) {
    return this.user.user({ id });
  }

  @ApiOkResponse({
    type: UserDto,
  })
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @Post(':userId/submit/:taskId')
  async completeTask(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('taskId', ParseUUIDPipe) taskId: string,
  ) {
    return this.user.completeTask({ userId, taskId });
  }

  @ApiOkResponse({
    type: DecompileAnswerResultDto,
  })
  @UseGuards(AuthGuard)
  @Roles(Role.User)
  @Post('submit-task/:id')
  async completeTaskMe(
    @Req() req,
    @Param('id', ParseUUIDPipe) taskId: string,
    @Body() dto: DecompileAnswerRequest,
  ) {
    const userId = req.user.userId;
    console.log(1);
    return this.user.tryCompleteTask({ userId, taskId, answer: dto.answer });
  }
}
