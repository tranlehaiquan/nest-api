import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  UploadImageRequest,
  UploadImageResponse,
  GetImageRequest,
  GetImageResponse,
  DeleteImageRequest,
  DeleteImageResponse,
  HealthCheckResponse,
} from '../types/image.types';

@Injectable()
export class ImageClientService {
  constructor(
    @Inject('IMAGE_SERVICE') private imageServiceClient: ClientProxy,
  ) {}

  async uploadImage(data: UploadImageRequest): Promise<UploadImageResponse> {
    return firstValueFrom(
      this.imageServiceClient.send<UploadImageResponse, UploadImageRequest>(
        'upload_image',
        data,
      ),
    );
  }

  async getImage(data: GetImageRequest): Promise<GetImageResponse> {
    return firstValueFrom(
      this.imageServiceClient.send<GetImageResponse, GetImageRequest>(
        'get_image',
        data,
      ),
    );
  }

  async deleteImage(data: DeleteImageRequest): Promise<DeleteImageResponse> {
    return firstValueFrom(
      this.imageServiceClient.send<DeleteImageResponse, DeleteImageRequest>(
        'delete_image',
        data,
      ),
    );
  }

  async healthCheck(): Promise<HealthCheckResponse> {
    return firstValueFrom(
      this.imageServiceClient.send<HealthCheckResponse, void>(
        'health_check',
        undefined,
      ),
    );
  }
}
