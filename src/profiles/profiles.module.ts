import { Module } from '@nestjs/common';
import { ProfilesController } from './profiles.controller';
import { UsersModule } from 'src/users/user.module';

@Module({
  imports: [UsersModule],
  providers: [],
  controllers: [ProfilesController],
})
export class ProfilesModule {}
