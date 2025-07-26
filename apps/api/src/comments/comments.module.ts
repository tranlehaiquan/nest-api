import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CommentsService } from './comments.service';
import { CommentsResolver } from './comments.resolver';
import { UsersModule } from 'src/users/user.module';

@Module({
  imports: [DatabaseModule, UsersModule],
  providers: [CommentsService, CommentsResolver],
  exports: [CommentsService],
})
export class CommentsModule {}
