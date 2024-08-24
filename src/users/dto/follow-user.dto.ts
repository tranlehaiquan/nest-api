import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@ArgsType()
class FollowUser {
  @Field(() => ID)
  @IsUUID()
  readonly followingId: string;
}

export default FollowUser;
