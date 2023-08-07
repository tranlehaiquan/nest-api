import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/user.module';
import { PostsModule } from './posts/post.module';

@Module({
  imports: [UsersModule, PostsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
