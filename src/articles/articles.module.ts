import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { PrismaModule } from 'src/database/prisma.module';
import ArticlesResolver from './articles.resolver';
import { CommentsModule } from 'src/comments/comments.module';
import { TagsModule } from 'src/tags/tags.module';

@Module({
  imports: [PrismaModule, CommentsModule, TagsModule],
  providers: [ArticlesService, ArticlesResolver],
  controllers: [],
})
export class ArticlesModule {}
