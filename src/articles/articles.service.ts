import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateArticle } from './dto/create-articles.dto';
import { stringToSlugWithRandomNumber } from 'src/utils/stringToSlug';
import { UpdateArticle } from './dto/update-articles.dto';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}
  findArticleById(id: string) {
    return this.prisma.post.findUnique({
      where: {
        id,
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

  findArticles() {
    return this.prisma.post.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        authorId: true,
        slug: true,
        createdAt: true,
      },
    });
  }

  createArticle(data: CreateArticle, authorId: string) {
    const slug = stringToSlugWithRandomNumber(data.title);

    return this.prisma.post.create({
      data: {
        ...data,
        slug,
        authorId,
      },
    });
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

  async deleteArticleBySlug(slug: string, authorId: string) {
    try {
      await this.prisma.post.delete({
        where: {
          slug,
          authorId,
        },
      });

      return {
        message: 'Article deleted successfully',
      };
    } catch (err) {
      console.log(err);
      throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
    }
  }
}
