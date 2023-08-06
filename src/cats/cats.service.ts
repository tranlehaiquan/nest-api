import { Injectable, Logger } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly logger = new Logger(CatsService.name);
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.logger.log('Creating a cat...');
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    this.logger.log('Finding all cats...');
    return this.cats;
  }

  // findone
  findOne(id: number): Cat {
    return this.cats[id];
  }
}
