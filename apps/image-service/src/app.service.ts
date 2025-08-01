import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs-extra';
import * as path from 'path';
import {
  UploadImageRequest,
  UploadImageResponse,
  GetImageResponse,
  DeleteImageResponse,
} from '@nest-api/image-types';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  private readonly uploadsDir = path.join(process.cwd(), 'uploads');

  constructor() {
    // Ensure uploads directory exists
    this.ensureUploadsDirectory();
  }

  private async ensureUploadsDirectory(): Promise<void> {
    try {
      await fs.ensureDir(this.uploadsDir);
      this.logger.log(`Uploads directory ensured: ${this.uploadsDir}`);
    } catch (error) {
      this.logger.error(`Failed to create uploads directory: ${error.message}`);
    }
  }

  getHello(): string {
    return 'Image Service is running!';
  }

  async uploadImage(data: UploadImageRequest): Promise<UploadImageResponse> {
    this.logger.log(`Uploading image: ${data.filename}`);

    try {
      // Generate unique image ID
      const imageId = `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Get file extension from original filename
      const fileExtension = path.extname(data.filename);
      const storedFilename = `${imageId}${fileExtension}`;
      const filePath = path.join(this.uploadsDir, storedFilename);

      // Debug: Log the type of data.file
      this.logger.log(
        `File type: ${typeof data.file}, isBuffer: ${Buffer.isBuffer(data.file)}`,
      );
      if (!Buffer.isBuffer(data.file)) {
        this.logger.log(
          `File data structure: ${JSON.stringify(Object.keys(data.file))}`,
        );
      }

      // Convert the file data back to Buffer if it was serialized
      const fileBuffer = Buffer.isBuffer(data.file)
        ? data.file
        : Buffer.from((data.file as any).data || data.file);

      // Write the file to local storage
      await fs.writeFile(filePath, fileBuffer);

      // Get file stats for metadata
      const stats = await fs.stat(filePath);
      const fileSizeInMB = (stats.size / (1024 * 1024)).toFixed(2);

      this.logger.log(`Image stored locally: ${filePath}`);

      return {
        success: true,
        imageId,
        filename: data.filename,
        url: `/uploads/${storedFilename}`, // Local URL path
        message: 'Image uploaded successfully',
      };
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
    this.logger.log(`Retrieving image: ${imageId}`);

    try {
      // Find the file in uploads directory
      const files = await fs.readdir(this.uploadsDir);
      const imageFile = files.find((file) => file.startsWith(imageId));

      if (!imageFile) {
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

      const filePath = path.join(this.uploadsDir, imageFile);
      const stats = await fs.stat(filePath);
      const fileExtension = path
        .extname(imageFile)
        .toUpperCase()
        .replace('.', '');
      const fileSizeInMB = (stats.size / (1024 * 1024)).toFixed(2);

      return {
        success: true,
        imageId,
        url: `/uploads/${imageFile}`,
        metadata: {
          size: `${fileSizeInMB}MB`,
          format: fileExtension,
          dimensions: 'Unknown', // Would need image processing library to get actual dimensions
        },
      };
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
    this.logger.log(`Deleting image: ${imageId}`);

    try {
      // Find the file in uploads directory
      const files = await fs.readdir(this.uploadsDir);
      const imageFile = files.find((file) => file.startsWith(imageId));

      if (!imageFile) {
        return {
          success: false,
          imageId,
          message: 'Image not found',
        };
      }

      const filePath = path.join(this.uploadsDir, imageFile);
      await fs.remove(filePath);

      this.logger.log(`Image deleted: ${filePath}`);

      return {
        success: true,
        imageId,
        message: 'Image deleted successfully',
      };
    } catch (error) {
      this.logger.error(`Failed to delete image: ${error.message}`);
      return {
        success: false,
        imageId,
        message: `Failed to delete image: ${error.message}`,
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
      const files = await fs.readdir(this.uploadsDir);
      const images: {
        imageId: string;
        filename: string;
        size: string;
        format: string;
      }[] = [];

      for (const file of files) {
        const filePath = path.join(this.uploadsDir, file);
        const stats = await fs.stat(filePath);
        const imageId = file.split('.')[0]; // Remove extension to get imageId
        const format = path.extname(file).toUpperCase().replace('.', '');
        const size = (stats.size / (1024 * 1024)).toFixed(2);

        images.push({
          imageId,
          filename: file,
          size: `${size}MB`,
          format,
        });
      }

      return {
        success: true,
        images,
      };
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
      const files = await fs.readdir(this.uploadsDir);
      let totalSize = 0;

      for (const file of files) {
        const filePath = path.join(this.uploadsDir, file);
        const stats = await fs.stat(filePath);
        totalSize += stats.size;
      }

      const totalSizeInMB = (totalSize / (1024 * 1024)).toFixed(2);

      return {
        success: true,
        totalFiles: files.length,
        totalSize: `${totalSizeInMB}MB`,
        uploadsDir: this.uploadsDir,
      };
    } catch (error) {
      this.logger.error(`Failed to get storage info: ${error.message}`);
      return {
        success: false,
        totalFiles: 0,
        totalSize: '0MB',
        uploadsDir: this.uploadsDir,
      };
    }
  }
}
