import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/user.module';
import { ProfilesModule } from './profiles/profiles.module';
import { ArticlesModule } from './articles/articles.module';
import { CommentsModule } from './comments/comments.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [
    UsersModule,
    ProfilesModule,
    ArticlesModule,
    CommentsModule,
    TagsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
