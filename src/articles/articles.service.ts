import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateArticle } from './dto/create-articles.dto';
import { stringToSlugWithRandomNumber } from '../utils/stringToSlug';
import { UpdateArticle } from './dto/update-articles.dto';

type QueryArticle = {
  tag?: string;
  author?: string;
  limit?: number;
  offset?: number;
};

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}
  findArticleById(id: string) {
    return this.prisma.post.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        title: true,
        description: true,
        body: true,
      },
    });
  }

  findArticleBySlug(slug: string) {
    return this.prisma.post.findUnique({
      where: {
        slug,
      },
      select: {
        id: true,
        title: true,
        description: true,
        body: true,
        createdAt: true,
        updatedAt: true,
        authorId: true,
      },
    });
  }

  findArticles(query: QueryArticle = { limit: 20, offset: 0 }) {
    return this.prisma.post.findMany({
      where: {
        author: {
          is: {
            username: query?.author,
          },
        },
        tags: query?.tag && {
          some: {
            name: query?.tag,
          },
        },
      },
      skip: query.offset,
      take: query.limit,
      select: {
        id: true,
        title: true,
        description: true,
        authorId: true,
        slug: true,
        createdAt: true,
        tags: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  createArticle(data: CreateArticle, authorId: string) {
    const slug = stringToSlugWithRandomNumber(data.title);
    const { tags, ...rest } = data;

    return this.prisma.post.create({
      data: {
        ...rest,
        slug,
        authorId,
        tags: {
          connectOrCreate: (tags || []).map((tag) => ({
            where: { name: tag },
            create: {
              name: tag,
              slug: stringToSlugWithRandomNumber(tag),
              description: tag,
            },
          })),
        },
      },
    });
  }

  async updateArticle(data: UpdateArticle, authorId: string) {
    try {
      const article = await this.prisma.post.update({
        where: {
          id: data.id,
          authorId,
        },
        data,
      });

      return article;
    } catch (err) {
      console.log(err);
      throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
    }
  }

  async updateArticleById(id: string, data: UpdateArticle, authorId: string) {
    try {
      const article = await this.prisma.post.update({
        where: {
          id,
          authorId,
        },
        data,
      });

      return article;
    } catch (err) {
      console.log(err);
      throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
    }
  }

  async updateArticleBySlug(
    slug: string,
    data: UpdateArticle,
    authorId: string,
  ) {
    try {
      const article = await this.prisma.post.update({
        where: {
          slug,
          authorId,
        },
        data,
      });

      return article;
    } catch (err) {
      console.log(err);
      throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
    }
  }

  async deleteArticleById(id: string, authorId: string) {
    try {
      return await this.prisma.post.delete({
        where: {
          id,
          authorId,
        },
      });
    } catch (err) {
      console.log(err);
      throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
    }
  }
}
