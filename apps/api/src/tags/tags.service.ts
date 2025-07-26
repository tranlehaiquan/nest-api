import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import stringToSlug from '../utils/stringToSlug';
import { CreateTag } from './dto/create-tags.dto';
import { tags, postTags } from '../database/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class TagsService {
  constructor(private database: DatabaseService) {}

  async getTags() {
    return this.database.db
      .select({
        id: tags.id,
        name: tags.name,
        slug: tags.slug,
      })
      .from(tags);
  }

  async createTag(tagInput: CreateTag) {
    // check if tag already exists
    const existingTag = await this.database.db
      .select()
      .from(tags)
      .where(eq(tags.name, tagInput.name))
      .limit(1);

    if (existingTag.length > 0) return existingTag[0];

    const newTag = await this.database.db
      .insert(tags)
      .values({
        name: tagInput.name,
        description: tagInput.name,
        slug: stringToSlug(tagInput.name),
      })
      .returning();

    return newTag[0];
  }

  async getTagsByPostId(postId: string) {
    return await this.database.db
      .select({
        id: tags.id,
        name: tags.name,
        slug: tags.slug,
      })
      .from(tags)
      .innerJoin(postTags, eq(tags.id, postTags.tagId))
      .where(eq(postTags.postId, postId));
  }
}
