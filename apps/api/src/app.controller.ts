import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  getHello(): string {
    return 'Up and running!';
  }
}
