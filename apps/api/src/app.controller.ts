import { Controller, Get } from '@nestjs/common';
import { ImageClientService } from './services/image-client.service';
import { HealthCheckResponse } from './types/image.types';

@Controller()
export class AppController {
  constructor(
    private imageClientService: ImageClientService
  ) {}

  @Get('/health')
  async healthCheck(): Promise<HealthCheckResponse> {
    return this.imageClientService.healthCheck();
  }

  @Get('/')
  getHello(): string {
    return 'Up and running!';
  }
}
