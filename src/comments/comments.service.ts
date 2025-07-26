import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import CreateComment from './dto/create-comment.dto';
import { comments } from '../database/schema';
import { eq, and } from 'drizzle-orm';

@Injectable()
export class CommentsService {
  constructor(private database: DatabaseService) {}

  // add comment to post
  async create(data: CreateComment, userId: string) {
    const newComment = await this.database.db
      .insert(comments)
      .values({
        body: data.body,
        postId: data.postId,
        authorId: userId,
      })
      .returning();

    return newComment[0];
  }

  async listCommentByArticleId(postId: string) {
    return await this.database.db
      .select()
      .from(comments)
      .where(eq(comments.postId, postId));
  }

  async remove(id: string, authorId: string) {
    const deletedComment = await this.database.db
      .delete(comments)
      .where(and(eq(comments.id, id), eq(comments.authorId, authorId)))
      .returning({
        id: comments.id,
      });

    return deletedComment[0];
  }

  // get comment from article
  async findOne(id: string) {
    const comment = await this.database.db
      .select({
        id: comments.id,
        body: comments.body,
        authorId: comments.authorId,
        postId: comments.postId,
      })
      .from(comments)
      .where(eq(comments.id, id))
      .limit(1);

    if (comment.length === 0) {
      throw new Error('Comment not found');
    }

    return comment[0];
  }
}
