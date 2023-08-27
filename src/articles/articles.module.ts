import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { PrismaModule } from 'src/database/prisma.module';
import ArticlesResolver from './articles.resolver';

@Module({
  imports: [PrismaModule],
  providers: [ArticlesService, ArticlesResolver],
  controllers: [ArticlesController],
})
export class ArticlesModule {}
