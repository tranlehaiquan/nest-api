import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ArticlesService } from './articles.service';
import { AuthGuard } from 'src/auth.guard';
import { CreateArticle } from './dto/create-articles.dto';
import { CurrentUser } from 'src/decorator/user.decorator';
import { UpdateArticle } from './dto/update-articles.dto';

@ApiTags('articles')
@Controller('articles')
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}

  @Get()
  async getArticles() {
    return this.articlesService.findArticles();
  }

  @Get(':slug')
  async getArticle(@Param('slug') slug: string) {
    return await this.articlesService.findArticleBySlug(slug);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  createArticle(@Body() body: CreateArticle, @CurrentUser() user) {
    return this.articlesService.createArticle(body, user.id);
  }

  @Post(':slug')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  updateArticle(
    @Param('slug') slug: string,
    @Body() body: UpdateArticle,
    @CurrentUser() user,
  ) {
    return this.articlesService.updateArticleBySlug(slug, body, user.id);
  }

  @Delete(':slug')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  deleteArticle(@Param('slug') slug: string, @CurrentUser() user) {
    return this.articlesService.deleteArticleBySlug(slug, user.id);
  }
}
