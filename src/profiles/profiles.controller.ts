import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';
import { CurrentUser } from 'src/decorator/user.decorator';
import { UserService } from 'src/users/user.service';

@Controller('profiles')
export class ProfilesController {
  // inject UserService
  constructor(private userService: UserService) {}

  // get :username
  @Get(':username')
  async getProfileUser(@Param('username') username: string) {
    // TODO return isFollowed
    return this.userService.getUserByUsername(username);
  }

  @Post()
  @UseGuards(AuthGuard)
  followUser(@CurrentUser() user) {
    return user;
  }

  @Delete()
  @UseGuards(AuthGuard)
  unFollowUser(@CurrentUser() user) {
    return user;
  }
}
