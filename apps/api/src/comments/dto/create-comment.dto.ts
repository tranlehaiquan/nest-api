import { IsUUID, IsString } from 'class-validator';
import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
class CreateComment {
  @Field(() => String)
  @IsString()
  body: string;

  @Field(() => ID)
  @IsUUID()
  postId: string;
}

export default CreateComment;
