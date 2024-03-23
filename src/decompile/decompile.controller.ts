import { Body, Controller, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { DecompileAnswerResultDto } from './dto/decompile.answer.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { DecompileService } from './decompile.service';
import { DecompileAnswerRequest } from './contracts/decompile.answer.request';

@ApiTags('Decompile flow')
@Controller('decompile')
export class DecompileController {
  constructor(private readonly textbox: DecompileService) {}

  @ApiOkResponse({
    type: DecompileAnswerResultDto,
  })
  @Post(':id')
  async answer(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() request: DecompileAnswerRequest,
  ): Promise<DecompileAnswerResultDto> {
    const { answer } = request;

    const result = await this.textbox.answer({
      id,
      answer,
    });

    return {
      decompile_id: id,
      answer,
      valid: result,
    };
  }
}
