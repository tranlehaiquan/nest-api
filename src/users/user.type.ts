import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
class User {
  @Field(() => String)
  id: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  bio: string;

  @Field(() => String)
  image: string;
}

@ObjectType()
export class UserLogin extends User {
  @Field(() => String)
  token: string;
}

export default User;
