import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import type CreateComment from './dto/create-comment.dto';
import { CommentsService } from './comments.service';
import { AuthGuard } from 'src/auth.guard';
import { CurrentUser } from 'src/decorator/user.decorator';
import { ApiBearerAuth, ApiTags, ApiQuery } from '@nestjs/swagger';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private commentService: CommentsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  createComment(@Body() createComment: CreateComment, @CurrentUser() user) {
    return this.commentService.create(createComment, user.id);
  }

  @Get('article/:id')
  @ApiQuery({
    name: 'id',
    type: String,
    required: true,
  })
  async getCommentsByArticleId(@Query('id') id) {
    return await this.commentService.listCommentByArticleId(id);
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiQuery({
    name: 'id',
    type: String,
    required: true,
  })
  async removeComment(@Query('id') id, @CurrentUser() user) {
    return await this.commentService.remove(id, user.id);
  }
}
