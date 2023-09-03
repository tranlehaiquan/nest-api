import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import stringToSlug from 'src/utils/stringToSlug';
import { CreateTag } from './dto/create-tags.dto';

@Injectable()
export class TagsService {
  constructor(private prismaService: PrismaService) {}

  async getTags() {
    return this.prismaService.tag.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
      },
    });
  }

  async createTag(tagInput: CreateTag) {
    // check if tag already exists
    const tag = await this.prismaService.tag.findUnique({
      where: {
        name: tagInput.name,
      },
    });

    if (tag) return tag;

    return await this.prismaService.tag.create({
      data: {
        name: tagInput.name,
        description: tagInput.name,
        slug: stringToSlug(tagInput.name),
      },
    });
  }

  async getTagsByPostId(postId: string) {
    return await this.prismaService.tag.findMany({
      where: {
        post: {
          some: {
            id: postId,
          },
        },
      },
      select: {
        id: true,
        name: true,
        slug: true,
      },
    });
  }
}
