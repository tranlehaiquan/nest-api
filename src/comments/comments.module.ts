import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { PrismaModule } from 'src/database/prisma.module';
import { CommentsResolver } from './comments.resolver';
import { UsersModule } from 'src/users/user.module';

@Module({
  imports: [PrismaModule, UsersModule],
  providers: [CommentsService, CommentsResolver],
  controllers: [],
  exports: [CommentsService],
})
export class CommentsModule {}
