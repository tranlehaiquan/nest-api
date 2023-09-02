import { IsUUID } from 'class-validator';
import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
class DeleteComment {
  @Field(() => ID)
  @IsUUID()
  commentId: string;
}

export default DeleteComment;
