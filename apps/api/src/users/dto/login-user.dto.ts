import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class LoginUserDto {
  @Field(() => String)
  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @Field(() => String)
  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
