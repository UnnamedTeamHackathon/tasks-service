import { ApiProperty } from '@nestjs/swagger';

export class PointsDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  points: number;
}