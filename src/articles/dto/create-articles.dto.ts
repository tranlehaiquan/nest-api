import { IsString, IsOptional } from 'class-validator';
import { Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class CreateArticle {
  @Field(() => String)
  @IsString()
  title: string;

  @Field(() => String)
  @IsString()
  description: string;

  @Field(() => String)
  @IsString()
  body: string;

  @Field(() => [String], { nullable: true })
  @IsString({ each: true })
  @IsOptional()
  tags: string[];
}
