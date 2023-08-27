import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
class Comment {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  body: string;
}

export default Comment;
