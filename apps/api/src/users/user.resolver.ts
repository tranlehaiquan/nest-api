import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import User, { ProfileUser, UserLogin } from './user.type';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';
import { AuthIsOptional, CurrentUser } from 'src/decorator/user.decorator';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import FollowUser from './dto/follow-user.dto';

@Resolver()
class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User)
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUser() user) {
    return this.userService.getUserById(user.id);
  }

  @Query(() => UserLogin)
  login(@Args() login: LoginUserDto) {
    return this.userService.login(login);
  }

  @Mutation(() => User)
  register(@Args() newUser: CreateUserDto) {
    return this.userService.createUser(newUser);
  }

  @Mutation(() => User)
  @UseGuards(AuthGuard)
  updateUser(@Args() user: UpdateUserDto, @CurrentUser() currentUser) {
    return this.userService.updateUserById(currentUser.id, user);
  }

  @AuthIsOptional()
  @UseGuards(AuthGuard)
  @Query(() => ProfileUser)
  getUser(@Args('username') username: string, @CurrentUser() user) {
    return this.userService.getProfileUser(username, user.id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean)
  followUser(@Args() arg: FollowUser, @CurrentUser() user) {
    return this.userService.followUser({
      followerId: user.id,
      followingId: arg.followingId,
    });
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean)
  unFollowUser(@Args() arg: FollowUser, @CurrentUser() user) {
    return this.userService.unFollowUser({
      followerId: user.id,
      followingId: arg.followingId,
    });
  }
}

export default UserResolver;
