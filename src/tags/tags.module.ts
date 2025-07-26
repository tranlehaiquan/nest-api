import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { TagsService } from './tags.service';
import { TagsResolver } from './tags.resolver';

@Module({
  imports: [DatabaseModule],
  providers: [TagsService, TagsResolver],
  exports: [TagsService],
})
export class TagsModule {}
