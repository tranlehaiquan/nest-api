import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { randomBytes, pbkdf2Sync } from 'crypto';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from '../database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

const select = {
  id: true,
  username: true,
  email: true,
  bio: true,
  image: true,
};

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(dto: CreateUserDto) {
    const { email, password, username } = dto;

    const salt = randomBytes(16).toString('hex');
    const hash = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

    // query user with email
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      throw new HttpException('Email already exist', HttpStatus.BAD_REQUEST);
    }

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
    const token = this.generateJWT(user);

    return {
      ...result,
      token,
    };
  }

  async getUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        username: true,
        email: true,
        bio: true,
        image: true,
      },
    });

    if (!user) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async getUserByUsername(username: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        username,
      },
      select,
    });

    if (!user) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async updateUserById(id: string, data: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data,
      select: {
        id: true,
        username: true,
        email: true,
        bio: true,
        image: true,
      },
    });

    return user;
  }

  async getProfileUser(username: string, currentUser?: string) {
    let following = false;
    const user = await this.prisma.user.findUnique({
      where: {
        username,
      },
      select: {
        ...select,
      },
    });

    if (currentUser) {
      const follower = await this.prisma.follows.findUnique({
        where: {
          followerId_followingId: {
            followerId: currentUser,
            followingId: user.id,
          },
        },
      });

      if (follower) {
        following = true;
      }
    }

    if (!user) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return {
      ...user,
      following,
    };
  }

  async followUser(data: { followerId: string; followingId: string }) {
    try {
      // check if it is already following
      const follower = await this.prisma.follows.findUnique({
        where: {
          followerId_followingId: {
            followerId: data.followerId,
            followingId: data.followingId,
          },
        },
      });

      if (follower) return true;

      await this.prisma.follows.create({
        data: {
          followerId: data.followerId,
          followingId: data.followingId,
        },
      });

      return true;
    } catch (error) {
      return false;
    }
  }

  async unFollowUser(data: { followerId: string; followingId: string }) {
    try {
      await this.prisma.follows.delete({
        where: {
          followerId_followingId: {
            followerId: data.followerId,
            followingId: data.followingId,
          },
        },
      });
    } catch (error) {
      return true;
    }
  }

  public generateJWT(user) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        exp: exp.getTime() / 1000,
      },
      process.env.JWT_SECRET,
    );
  }
}
