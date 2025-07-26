// module UserModule
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { DatabaseModule } from 'src/database/database.module';
import UserResolver from './user.resolver';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UsersModule {}
