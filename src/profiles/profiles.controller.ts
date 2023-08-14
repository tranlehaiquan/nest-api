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
    // TODO return isFollowed
    return this.userService.getProfileUser(username, user?.id);
  }

  @Post()
  @UseGuards(AuthGuard)
  async followUser(@CurrentUser() user) {
    return user;
  }

  @Delete()
  @UseGuards(AuthGuard)
  async unFollowUser(@CurrentUser() user) {
    return user;
  }
}
