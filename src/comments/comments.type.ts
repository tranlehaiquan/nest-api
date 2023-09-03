import { Field, ID, ObjectType } from '@nestjs/graphql';
import User from 'src/users/user.type';

@ObjectType()
class Comment {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  body: string;

  @Field(() => ID)
  authorId: string;

  @Field(() => User)
  author: User;
}

// TODO: __typename with be CommentDeleteResult
// for same use case in Front End we will need __typename to be Comment
@ObjectType()
export class CommentDeleteResult {
  @Field(() => ID)
  id: string;
}

export default Comment;
