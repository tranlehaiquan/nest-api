import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { 
  UploadImageRequest, 
  UploadImageResponse,
  GetImageRequest,
  GetImageResponse,
  DeleteImageRequest,
  DeleteImageResponse,
  HealthCheckResponse
} from './types/image.types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('upload_image')
  async uploadImage(@Payload() data: UploadImageRequest): Promise<UploadImageResponse> {
    return this.appService.uploadImage(data);
  }

  @MessagePattern('get_image')
  async getImage(@Payload() data: GetImageRequest): Promise<GetImageResponse> {
    return this.appService.getImage(data.imageId);
  }

  @MessagePattern('delete_image')
  async deleteImage(@Payload() data: DeleteImageRequest): Promise<DeleteImageResponse> {
    return this.appService.deleteImage(data.imageId);
  }

  @MessagePattern('health_check')
  async healthCheck(): Promise<HealthCheckResponse> {
    return { message: this.appService.getHello() };
  }
}