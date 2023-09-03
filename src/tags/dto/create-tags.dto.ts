import { IsString } from 'class-validator';
import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CreateTag {
  @Field(() => String)
  @IsString()
  name: string;
}
