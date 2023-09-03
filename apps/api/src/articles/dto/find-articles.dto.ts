import { IsOptional, IsString } from 'class-validator';

// tag, author, limit, offset
export class ListArticles {
  @IsString()
  @IsOptional()
  tag?: string;

  @IsString()
  @IsOptional()
  author?: string;

  @IsString()
  @IsOptional()
  limit?: number;

  @IsString()
  @IsOptional()
  offset?: number;
}
