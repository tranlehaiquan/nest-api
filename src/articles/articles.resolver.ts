import { UseGuards } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import Articles from './articles.type';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth.guard';
import { CreateArticle } from './dto/create-articles.dto';
import { CurrentUser } from 'src/decorator/user.decorator';
import { UpdateArticle } from './dto/update-articles.dto';

@Resolver(Articles)
class ArticlesResolver {
  constructor(private services: ArticlesService) {}
  @Query(() => [Articles])
  async articles() {
    return this.services.findArticles();
  }

  @Query(() => Articles)
  async articleById(@Args('id') id: string) {
    return this.services.findArticleById(id);
  }

  @Mutation(() => Articles)
  @UseGuards(AuthGuard)
  async createArticle(@Args() newArticle: CreateArticle, @CurrentUser() user) {
    return await this.services.createArticle(newArticle, user.id);
  }

  @Mutation(() => Articles)
  @UseGuards(AuthGuard)
  async updateArticle(
    @Args() updateArticle: UpdateArticle,
    @CurrentUser() user,
  ) {
    return await this.services.updateArticle(updateArticle, user.id);
  }

  @Mutation(() => Articles)
  @UseGuards(AuthGuard)
  async deleteArticle(@Args('id') id: string, @CurrentUser() user) {
    return await this.services.deleteArticleById(id, user.id);
  }
}

export default ArticlesResolver;
