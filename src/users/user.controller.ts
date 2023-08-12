// controller users
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from 'src/auth.guard';
import { CurrentUser } from 'src/decorator/user.decorator';
import { UpdateUser } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('register')
  register(@Body('user') userData: CreateUserDto) {
    return this.userService.createUser(userData);
  }

  @Post('login')
  login(@Body('user') userData: LoginUserDto) {
    return this.userService.login(userData);
  }

  @Post('forgot-password')
  forgotPassword() {
    return 'This action returns all users';
  }

  @Post()
  @UseGuards(AuthGuard)
  async updateUser(@Body('user') userDate: UpdateUser, @CurrentUser() user) {
    return await this.userService.updateUserById(user.id, userDate);
  }

  @Get(['', 'whoami'])
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUser() user) {
    return user;
  }
}
