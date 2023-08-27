import { Resolver, Query, Args } from '@nestjs/graphql';
import User, { UserLogin } from './user.type';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';
import { CurrentUser } from 'src/decorator/user.decorator';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';

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
}

export default UserResolver;
