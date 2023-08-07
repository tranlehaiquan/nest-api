// controller users
import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

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

  @Get()
  getCurrentUser() {
    return 'This action returns all users';
  }
}
