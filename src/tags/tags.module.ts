import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { PrismaModule } from 'src/database/prisma.module';
import { TagsResolver } from './tags.resolver';

@Module({
  imports: [PrismaModule],
  providers: [TagsService, TagsResolver],
  controllers: [TagsController],
})
export class TagsModule {}
