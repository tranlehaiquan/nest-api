import { IsString, IsUUID, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArticle {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  body: string;

  // list of uuid
  // @IsUUID('4', { each: true })
  // @IsOptional()
  // tagList: string[];
}
