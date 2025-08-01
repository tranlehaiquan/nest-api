import { Injectable, Logger } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  UploadImageRequest,
  UploadImageResponse,
  GetImageRequest,
  GetImageResponse,
  DeleteImageRequest,
  DeleteImageResponse,
  HealthCheckResponse,
} from '@nest-api/image-types';

@Injectable()
export class ImageClientService {
  private readonly logger = new Logger(ImageClientService.name);
  private readonly client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: process.env.IMAGE_SERVICE_HOST || 'localhost',
        port: parseInt(process.env.IMAGE_SERVICE_PORT || '3001'),
      },
    });
  }

  async onModuleInit() {
    await this.client.connect();
    this.logger.log('Connected to Image Service');
  }

  async onModuleDestroy() {
    await this.client.close();
    this.logger.log('Disconnected from Image Service');
  }

  async uploadImage(data: UploadImageRequest): Promise<UploadImageResponse> {
    try {
      this.logger.log(`Uploading image: ${data.filename}`);
      return await firstValueFrom(
        this.client.send<UploadImageResponse>('upload_image', data),
      );
    } catch (error) {
      this.logger.error(`Failed to upload image: ${error.message}`);
      return {
        success: false,
        imageId: '',
        filename: data.filename,
        url: '',
        message: `Failed to upload image: ${error.message}`,
      };
    }
  }

  async getImage(imageId: string): Promise<GetImageResponse> {
    try {
      this.logger.log(`Getting image: ${imageId}`);
      return await firstValueFrom(
        this.client.send<GetImageResponse>('get_image', { imageId }),
      );
    } catch (error) {
      this.logger.error(`Failed to get image: ${error.message}`);
      return {
        success: false,
        imageId,
        url: '',
        metadata: {
          size: '',
          format: '',
          dimensions: '',
        },
      };
    }
  }

  async deleteImage(imageId: string): Promise<DeleteImageResponse> {
    try {
      this.logger.log(`Deleting image: ${imageId}`);
      return await firstValueFrom(
        this.client.send<DeleteImageResponse>('delete_image', { imageId }),
      );
    } catch (error) {
      this.logger.error(`Failed to delete image: ${error.message}`);
      return {
        success: false,
        imageId,
        message: `Failed to delete image: ${error.message}`,
      };
    }
  }

  async healthCheck(): Promise<HealthCheckResponse> {
    try {
      this.logger.log('Checking image service health');
      return await firstValueFrom(
        this.client.send<HealthCheckResponse>('health_check', {}),
      );
    } catch (error) {
      this.logger.error(`Health check failed: ${error.message}`);
      return {
        message: `Image service health check failed: ${error.message}`,
      };
    }
  }

  async listImages(): Promise<{
    success: boolean;
    images: Array<{
      imageId: string;
      filename: string;
      size: string;
      format: string;
    }>;
  }> {
    try {
      this.logger.log('Listing images');
      return await firstValueFrom(this.client.send('list_images', {}));
    } catch (error) {
      this.logger.error(`Failed to list images: ${error.message}`);
      return {
        success: false,
        images: [],
      };
    }
  }

  async getStorageInfo(): Promise<{
    success: boolean;
    totalFiles: number;
    totalSize: string;
    uploadsDir: string;
  }> {
    try {
      this.logger.log('Getting storage info');
      return await firstValueFrom(this.client.send('get_storage_info', {}));
    } catch (error) {
      this.logger.error(`Failed to get storage info: ${error.message}`);
      return {
        success: false,
        totalFiles: 0,
        totalSize: '0MB',
        uploadsDir: '',
      };
    }
  }
}
