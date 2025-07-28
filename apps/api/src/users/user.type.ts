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

  @Field(() => String, { nullable: true })
  image: string;
}

@ObjectType()
export class UserLogin extends User {
  @Field(() => String)
  token: string;
}

@ObjectType()
export class ProfileUser extends User {
  @Field(() => Boolean, { nullable: true })
  following: boolean;
}

export default User;
