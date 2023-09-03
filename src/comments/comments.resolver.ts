import {
  Resolver,
  Query,
  Args,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import Comment, { CommentDeleteResult } from './comments.type';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';
import CreateComment from './dto/create-comment.dto';
import { CurrentUser } from 'src/decorator/user.decorator';
import DeleteComment from './dto/delete-comment.dto';
import { UserService } from 'src/users/user.service';
import User from 'src/users/user.type';

@Resolver(Comment)
export class CommentsResolver {
  constructor(
    private services: CommentsService,
    private userServices: UserService,
  ) {}

  @Query(() => [Comment])
  getCommentsByArticleId(@Args('id') id: string) {
    return this.services.listCommentByArticleId(id);
  }

  @Mutation(() => Comment)
  @UseGuards(AuthGuard)
  createComment(@Args() newComment: CreateComment, @CurrentUser() user: any) {
    return this.services.create(newComment, user.id);
  }

  @Mutation(() => CommentDeleteResult)
  @UseGuards(AuthGuard)
  removeComment(
    @Args() deleteComment: DeleteComment,
    @CurrentUser() user: any,
  ) {
    return this.services.remove(deleteComment.commentId, user.id);
  }

  @ResolveField(() => User)
  async author(@Parent() comment: Comment) {
    return this.userServices.getUserById(comment.authorId);
  }
}
