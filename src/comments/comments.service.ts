import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import CreateComment from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  // add comment to post
  async create(data: CreateComment, userId: string) {
    return await this.prisma.comment.create({
      data: {
        body: data.body,
        postId: data.postId,
        authorId: userId,
      },
    });
  }

  async listCommentByArticleId(postId: string) {
    return await this.prisma.comment.findMany({
      where: {
        postId,
      },
    });
  }

  async remove(id: string, authorId: string) {
    return await this.prisma.comment.delete({
      where: {
        id,
        authorId,
      },
      select: {
        id: true,
      },
    });
  }

  // get comment from article
  async findOne(id: string) {
    return await this.prisma.comment.findFirstOrThrow({
      where: {
        id,
      },
      select: {
        id: true,
        body: true,
        authorId: true,
        postId: true,
      },
    });
  }
}
