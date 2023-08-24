import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TagsService } from './tags.service';
import { CreateTag } from './dto/create-tags.dto';
import { AuthGuard } from 'src/auth.guard';

@ApiTags('tags')
@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Get()
  async findAll() {
    return await this.tagsService.getTags();
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async create(@Body() createTag: CreateTag) {
    return await this.tagsService.createTag(createTag);
  }
}
