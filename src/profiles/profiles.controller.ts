import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth.guard';
import { AuthIsOptional, CurrentUser } from 'src/decorator/user.decorator';
import { UserService } from 'src/users/user.service';

@ApiTags('profiles')
@Controller('profiles')
export class ProfilesController {
  // inject UserService
  constructor(private userService: UserService) {}

  // get :username
  @Get(':username')
  @AuthIsOptional()
  @UseGuards(AuthGuard)
  async getProfileUser(
    @Param('username') username: string,
    @CurrentUser() user,
  ) {
    return this.userService.getProfileUser(username, user?.id);
  }

  @Post(':userId')
  @UseGuards(AuthGuard)
  async followUser(@CurrentUser() user, @Param('userId') userId: string) {
    return this.userService.followUser({
      followerId: user.id,
      followingId: userId,
    });
  }

  @Delete(':userId')
  @UseGuards(AuthGuard)
  async unFollowUser(@CurrentUser() user, @Param('userId') userId: string) {
    return this.userService.unFollowUser({
      followerId: user.id,
      followingId: userId,
    });
  }
}
