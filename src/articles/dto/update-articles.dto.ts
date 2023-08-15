import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateArticle {
  @ApiProperty({ nullable: true })
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty({ nullable: true })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ nullable: true })
  @IsString()
  @IsOptional()
  body: string;
}
