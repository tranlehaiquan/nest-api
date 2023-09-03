// module UserModule
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaModule } from 'src/database/prisma.module';
import UserResolver from './user.resolver';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UsersModule {}
