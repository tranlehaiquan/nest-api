// controller users
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { CurrentUser } from 'src/decorator/user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  register(@Body() userData: CreateUserDto) {
    return this.userService.createUser(userData);
  }

  @Post('login')
  login(@Body() userData: LoginUserDto) {
    return this.userService.login(userData);
  }

  @Post('forgot-password')
  forgotPassword(@Body() userData: ForgotPasswordDto) {
    return userData.email;
  }

  @Post()
  @UseGuards(AuthGuard)
  async updateUser(@Body() userDate: UpdateUserDto, @CurrentUser() user) {
    return await this.userService.updateUserById(user.id, userDate);
  }

  @Get(['', 'whoami'])
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  whoAmI(@CurrentUser() user) {
    return user;
  }
}
