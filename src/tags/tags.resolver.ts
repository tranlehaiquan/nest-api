import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TagsService } from './tags.service';
import Tags from './tags.type';
import { AuthGuard } from 'src/auth.guard';
import { UseGuards } from '@nestjs/common';
import { CreateTag } from './dto/create-tags.dto';

@Resolver(Tags)
export class TagsResolver {
  constructor(private services: TagsService) {}

  @Query(() => [Tags])
  tags() {
    return this.services.getTags();
  }

  @Mutation(() => Tags)
  @UseGuards(AuthGuard)
  async create(@Args() createTag: CreateTag) {
    return await this.services.createTag(createTag);
  }
}
