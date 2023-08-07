import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { randomBytes, pbkdf2Sync } from 'crypto';
import { PrismaService } from '../database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(dto: CreateUserDto) {
    const { email, password, username } = dto;

    const salt = randomBytes(16).toString('hex');
    const hash = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

    const newUser = await this.prisma.user.create({
      data: {
        username,
        email,
        salt,
        hash,
      },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });

    return newUser;
  }

  async login(dto: LoginUserDto) {
    const { email, password } = dto;

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const { salt, hash: userHash, ...result } = user;
    const hash = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

    if (hash !== userHash) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return result;
  }
}
