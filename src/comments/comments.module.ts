import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { PrismaModule } from 'src/database/prisma.module';
import { CommentsResolver } from './comments.resolver';

@Module({
  imports: [PrismaModule],
  providers: [CommentsService, CommentsResolver],
  controllers: [],
  exports: [CommentsService],
})
export class CommentsModule {}
