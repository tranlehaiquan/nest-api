import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { PrismaModule } from 'src/database/prisma.module';
import { TagsResolver } from './tags.resolver';

@Module({
  imports: [PrismaModule],
  providers: [TagsService, TagsResolver],
  controllers: [],
})
export class TagsModule {}
