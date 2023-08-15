import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTag {
  @ApiProperty()
  @IsString()
  name: string;
}
