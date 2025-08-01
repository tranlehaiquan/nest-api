import { Controller, Get } from '@nestjs/common';
import { HealthCheckResponse } from './types/image.types';

@Controller()
export class AppController {
  @Get('/')
  getHello(): string {
    return 'Up and running!';
  }
}
