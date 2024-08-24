import { IsNotEmpty } from 'class-validator';
import { Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class LoginUserDto {
  @Field(() => String)
  @IsNotEmpty()
  email: string;

  @Field(() => String)
  @IsNotEmpty()
  password: string;
}
