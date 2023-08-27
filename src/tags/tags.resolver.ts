import { Query, Resolver } from '@nestjs/graphql';
import { TagsService } from './tags.service';
import Tags from './tags.type';

@Resolver(Tags)
export class TagsResolver {
  constructor(private services: TagsService) {}

  @Query(() => [Tags])
  tags() {
    return this.services.getTags();
  }
}
