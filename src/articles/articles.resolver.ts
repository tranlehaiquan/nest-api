import { ArticlesService } from './articles.service';
import Articles from './articles.type';
import { Resolver, Query, Args } from '@nestjs/graphql';

@Resolver(Articles)
class ArticlesResolver {
  constructor(private services: ArticlesService) {}
  @Query(() => [Articles])
  articles() {
    return this.services.findArticles();
  }

  @Query(() => Articles)
  articleById(@Args('id') id: string) {
    return this.services.findArticleById(id);
  }
}

export default ArticlesResolver;
