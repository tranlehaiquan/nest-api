import { Resolver, Query, Args } from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import Comment from './comments.type';

@Resolver(Comment)
export class CommentsResolver {
  constructor(private services: CommentsService) {}

  @Query(() => [Comment])
  commentsByArticleId(@Args('id') id: string) {
    return this.services.listCommentByArticleId(id);
  }
}
