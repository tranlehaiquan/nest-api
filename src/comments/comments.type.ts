import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
class Comment {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  body: string;
}

@ObjectType()
export class CommentDeleteResult {
  @Field(() => ID)
  id: string;
}

export default Comment;
