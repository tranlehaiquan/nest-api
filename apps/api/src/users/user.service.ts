import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { randomBytes, pbkdf2Sync } from 'crypto';
import * as jwt from 'jsonwebtoken';
import { DatabaseService } from '../database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { users, follows } from '../database/schema';
import { eq, and } from 'drizzle-orm';

const select = {
  id: true,
  username: true,
  email: true,
  bio: true,
  image: true,
};

@Injectable()
export class UserService {
  constructor(private database: DatabaseService) {}

  async createUser(dto: CreateUserDto) {
    const { email, password, username } = dto;

    const salt = randomBytes(16).toString('hex');
    const hash = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

    // query user with email
    const user = await this.database.db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (user.length > 0) {
      throw new HttpException('Email already exist', HttpStatus.BAD_REQUEST);
    }

    const newUser = await this.database.db
      .insert(users)
      .values({
        username,
        email,
        salt,
        hash,
        bio: '',
        image: '',
      })
      .returning({
        id: users.id,
        username: users.username,
        email: users.email,
        bio: users.bio,
        image: users.image,
      });

    return newUser[0];
  }

  async login(dto: LoginUserDto) {
    const { email, password } = dto;

    const user = await this.database.db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (user.length === 0) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const userRecord = user[0];
    const { salt, hash: userHash, ...result } = userRecord;
    const hash = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

    if (hash !== userHash) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const token = this.generateJWT(userRecord);

    return {
      ...result,
      token,
    };
  }

  async getUserById(id: string) {
    const user = await this.database.db
      .select({
        id: users.id,
        username: users.username,
        email: users.email,
        bio: users.bio,
        image: users.image,
      })
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    if (user.length === 0) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return user[0];
  }

  async getUserByUsername(username: string) {
    const user = await this.database.db
      .select({
        id: users.id,
        username: users.username,
        email: users.email,
        bio: users.bio,
        image: users.image,
      })
      .from(users)
      .where(eq(users.username, username))
      .limit(1);

    if (user.length === 0) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return user[0];
  }

  async updateUserById(id: string, data: UpdateUserDto) {
    const user = await this.database.db
      .update(users)
      .set(data)
      .where(eq(users.id, id))
      .returning({
        id: users.id,
        username: users.username,
        email: users.email,
        bio: users.bio,
        image: users.image,
      });

    return user[0];
  }

  async getProfileUser(username: string, currentUser?: string) {
    let following = false;
    const user = await this.database.db
      .select({
        id: users.id,
        username: users.username,
        email: users.email,
        bio: users.bio,
        image: users.image,
      })
      .from(users)
      .where(eq(users.username, username))
      .limit(1);

    if (user.length === 0) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    const userRecord = user[0];

    if (currentUser) {
      const follower = await this.database.db
        .select()
        .from(follows)
        .where(
          and(
            eq(follows.followerId, currentUser),
            eq(follows.followingId, userRecord.id),
          ),
        )
        .limit(1);

      if (follower.length > 0) {
        following = true;
      }
    }

    return {
      ...userRecord,
      following,
    };
  }

  async followUser(data: { followerId: string; followingId: string }) {
    try {
      // check if it is already following
      const follower = await this.database.db
        .select()
        .from(follows)
        .where(
          and(
            eq(follows.followerId, data.followerId),
            eq(follows.followingId, data.followingId),
          ),
        )
        .limit(1);

      if (follower.length > 0) return true;

      await this.database.db.insert(follows).values({
        followerId: data.followerId,
        followingId: data.followingId,
      });

      return true;
    } catch (error) {
      return false;
    }
  }

  async unFollowUser(data: { followerId: string; followingId: string }) {
    try {
      await this.database.db
        .delete(follows)
        .where(
          and(
            eq(follows.followerId, data.followerId),
            eq(follows.followingId, data.followingId),
          ),
        );

      return true;
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
