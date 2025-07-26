import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { DatabaseModule } from 'src/database/database.module';
import ArticlesResolver from './articles.resolver';
import { CommentsModule } from 'src/comments/comments.module';
import { TagsModule } from 'src/tags/tags.module';

@Module({
  imports: [DatabaseModule, CommentsModule, TagsModule],
  providers: [ArticlesService, ArticlesResolver],
  controllers: [],
})
export class ArticlesModule {}
