import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageClientService } from '../services/image-client.service';

@Controller('image-test')
export class ImageTestController {
  private readonly logger = new Logger(ImageTestController.name);

  constructor(private readonly imageClientService: ImageClientService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    this.logger.log(`Uploading file: ${file.originalname}`);

    const uploadRequest = {
      file: file.buffer,
      filename: file.originalname,
    };

    const result = await this.imageClientService.uploadImage(uploadRequest);

    return {
      ...result,
      originalFile: {
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
      },
    };
  }

  @Get('image/:imageId')
  async getImage(@Param('imageId') imageId: string) {
    this.logger.log(`Getting image: ${imageId}`);
    return await this.imageClientService.getImage(imageId);
  }

  @Delete('image/:imageId')
  async deleteImage(@Param('imageId') imageId: string) {
    this.logger.log(`Deleting image: ${imageId}`);
    return await this.imageClientService.deleteImage(imageId);
  }

  @Get('images')
  async listImages() {
    this.logger.log('Listing all images');
    return await this.imageClientService.listImages();
  }

  @Get('storage-info')
  async getStorageInfo() {
    this.logger.log('Getting storage info');
    return await this.imageClientService.getStorageInfo();
  }

  @Get('health')
  async healthCheck() {
    this.logger.log('Checking image service health');
    return await this.imageClientService.healthCheck();
  }

  @Post('test-upload')
  async testUpload(@Body() body: { filename: string; content: string }) {
    this.logger.log(`Testing upload with filename: ${body.filename}`);

    // Create a test buffer from the content
    const buffer = Buffer.from(body.content, 'base64');

    const uploadRequest = {
      file: buffer,
      filename: body.filename,
    };

    const result = await this.imageClientService.uploadImage(uploadRequest);

    return {
      ...result,
      testData: {
        originalContent: body.content,
        bufferSize: buffer.length,
      },
    };
  }

  @Post('test-simple')
  async testSimpleUpload() {
    this.logger.log('Testing simple upload with minimal data');

    // Create a simple test buffer (1x1 pixel PNG)
    const testBuffer = Buffer.from([
      0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d,
      0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
      0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53, 0xde, 0x00, 0x00, 0x00,
      0x0c, 0x49, 0x44, 0x41, 0x54, 0x08, 0xd7, 0x63, 0xf8, 0xcf, 0x00, 0x00,
      0x03, 0x01, 0x01, 0x00, 0x18, 0xdd, 0x8d, 0xb0, 0x00, 0x00, 0x00, 0x00,
      0x49, 0x45, 0x4e, 0x44, 0xae, 0x42, 0x60, 0x82,
    ]);

    const uploadRequest = {
      file: testBuffer,
      filename: 'test-simple.png',
    };

    const result = await this.imageClientService.uploadImage(uploadRequest);

    return {
      ...result,
      testData: {
        bufferSize: testBuffer.length,
        isBuffer: Buffer.isBuffer(testBuffer),
      },
    };
  }
}
