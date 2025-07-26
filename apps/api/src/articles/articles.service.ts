import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateArticle } from './dto/create-articles.dto';
import { stringToSlugWithRandomNumber } from '../utils/stringToSlug';
import { UpdateArticle } from './dto/update-articles.dto';
import { posts, tags, postTags, users } from '../database/schema';
import { eq, and, sql } from 'drizzle-orm';

type QueryArticle = {
  tag?: string;
  author?: string;
  limit?: number;
  offset?: number;
};

@Injectable()
export class ArticlesService {
  constructor(private database: DatabaseService) {}
  
  findArticleById(id: string) {
    return this.database.db
      .select({
        id: posts.id,
        title: posts.title,
        description: posts.description,
        body: posts.body,
      })
      .from(posts)
      .where(eq(posts.id, id))
      .limit(1)
      .then(result => result[0]);
  }

  findArticleBySlug(slug: string) {
    return this.database.db
      .select({
        id: posts.id,
        title: posts.title,
        description: posts.description,
        body: posts.body,
        createdAt: posts.createdAt,
        updatedAt: posts.updatedAt,
        authorId: posts.authorId,
      })
      .from(posts)
      .where(eq(posts.slug, slug))
      .limit(1)
      .then(result => result[0]);
  }

  async findArticles(query: QueryArticle = { limit: 20, offset: 0 }) {
    // Build the where conditions
    const whereConditions = [];
    const joins = [];

    // Add author filter if specified
    if (query.author) {
      joins.push({ table: users, condition: eq(posts.authorId, users.id) });
      whereConditions.push(eq(users.username, query.author));
    }

    // Add tag filter if specified
    if (query.tag) {
      joins.push(
        { table: postTags, condition: eq(posts.id, postTags.postId) },
        { table: tags, condition: eq(postTags.tagId, tags.id) }
      );
      whereConditions.push(eq(tags.name, query.tag));
    }

    // Build the query based on conditions
    let results;
    if (joins.length === 0) {
      // No joins needed
      results = await this.database.db
        .select({
          id: posts.id,
          title: posts.title,
          description: posts.description,
          authorId: posts.authorId,
          slug: posts.slug,
          createdAt: posts.createdAt,
        })
        .from(posts)
        .limit(query.limit!)
        .offset(query.offset!);
    } else if (query.author && !query.tag) {
      // Only author filter
      results = await this.database.db
        .select({
          id: posts.id,
          title: posts.title,
          description: posts.description,
          authorId: posts.authorId,
          slug: posts.slug,
          createdAt: posts.createdAt,
        })
        .from(posts)
        .innerJoin(users, eq(posts.authorId, users.id))
        .where(eq(users.username, query.author))
        .limit(query.limit!)
        .offset(query.offset!);
    } else if (query.tag && !query.author) {
      // Only tag filter
      results = await this.database.db
        .select({
          id: posts.id,
          title: posts.title,
          description: posts.description,
          authorId: posts.authorId,
          slug: posts.slug,
          createdAt: posts.createdAt,
        })
        .from(posts)
        .innerJoin(postTags, eq(posts.id, postTags.postId))
        .innerJoin(tags, eq(postTags.tagId, tags.id))
        .where(eq(tags.name, query.tag))
        .limit(query.limit!)
        .offset(query.offset!);
    } else {
      // Both author and tag filters
      results = await this.database.db
        .select({
          id: posts.id,
          title: posts.title,
          description: posts.description,
          authorId: posts.authorId,
          slug: posts.slug,
          createdAt: posts.createdAt,
        })
        .from(posts)
        .innerJoin(users, eq(posts.authorId, users.id))
        .innerJoin(postTags, eq(posts.id, postTags.postId))
        .innerJoin(tags, eq(postTags.tagId, tags.id))
        .where(and(eq(users.username, query.author!), eq(tags.name, query.tag!)))
        .limit(query.limit!)
        .offset(query.offset!);
    }

    // Get tags for each article
    const articlesWithTags = await Promise.all(
      results.map(async (article) => {
        const articleTags = await this.database.db
          .select({
            id: tags.id,
            name: tags.name,
          })
          .from(tags)
          .innerJoin(postTags, eq(tags.id, postTags.tagId))
          .where(eq(postTags.postId, article.id));

        return {
          ...article,
          tags: articleTags,
        };
      })
    );

    return articlesWithTags;
  }

  async createArticle(data: CreateArticle, authorId: string) {
    const slug = stringToSlugWithRandomNumber(data.title);
    const { tags: articleTags, ...rest } = data;

    // Create the article first
    const newArticle = await this.database.db
      .insert(posts)
      .values({
        ...rest,
        slug,
        authorId,
      })
      .returning();

    const article = newArticle[0];

    // Handle tags if they exist
    if (articleTags && articleTags.length > 0) {
      for (const tagName of articleTags) {
        // Check if tag exists, if not create it
        let tag = await this.database.db
          .select()
          .from(tags)
          .where(eq(tags.name, tagName))
          .limit(1);

        if (tag.length === 0) {
          const newTag = await this.database.db
            .insert(tags)
            .values({
              name: tagName,
              slug: stringToSlugWithRandomNumber(tagName),
              description: tagName,
            })
            .returning();
          tag = newTag;
        }

        // Create the relationship
        await this.database.db
          .insert(postTags)
          .values({
            postId: article.id,
            tagId: tag[0].id,
          });
      }
    }

    return article;
  }

  async updateArticle(data: UpdateArticle, authorId: string) {
    try {
      const article = await this.database.db
        .update(posts)
        .set(data)
        .where(and(eq(posts.id, data.id), eq(posts.authorId, authorId)))
        .returning();

      if (article.length === 0) {
        throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
      }

      return article[0];
    } catch (err) {
      console.log(err);
      throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
    }
  }

  async updateArticleById(id: string, data: UpdateArticle, authorId: string) {
    try {
      const article = await this.database.db
        .update(posts)
        .set(data)
        .where(and(eq(posts.id, id), eq(posts.authorId, authorId)))
        .returning();

      if (article.length === 0) {
        throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
      }

      return article[0];
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
      const article = await this.database.db
        .update(posts)
        .set(data)
        .where(and(eq(posts.slug, slug), eq(posts.authorId, authorId)))
        .returning();

      if (article.length === 0) {
        throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
      }

      return article[0];
    } catch (err) {
      console.log(err);
      throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
    }
  }

  async deleteArticleById(id: string, authorId: string) {
    try {
      const deletedArticle = await this.database.db
        .delete(posts)
        .where(and(eq(posts.id, id), eq(posts.authorId, authorId)))
        .returning();

      if (deletedArticle.length === 0) {
        throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
      }

      return deletedArticle[0];
    } catch (err) {
      console.log(err);
      throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
    }
  }
}
