import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { PrismaModule } from 'src/database/prisma.module';
import { CommentsResolver } from './comments.resolver';

@Module({
  imports: [PrismaModule],
  providers: [CommentsService, CommentsResolver],
  controllers: [CommentsController],
})
export class CommentsModule {}
