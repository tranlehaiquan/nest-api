# Image Service Integration

This document describes the integration of the Image Service with the main API.

## Overview

The main API now includes a test controller that communicates with the Image Service microservice to test local image storage functionality.

## Architecture

```
┌─────────────────┐    TCP    ┌─────────────────┐
│   Main API      │ ────────► │  Image Service  │
│  (Port 3000)    │           │  (Port 3001)    │
└─────────────────┘           └─────────────────┘
        │                              │
        │                              │
        ▼                              ▼
┌─────────────────┐           ┌─────────────────┐
│   HTTP Routes   │           │  Local Storage  │
│                 │           │   (uploads/)    │
└─────────────────┘           └─────────────────┘
```

## Components

### 1. ImageClientService (`src/services/image-client.service.ts`)

A service that handles communication with the Image Service microservice using TCP transport.

**Features:**

- Connects to Image Service via TCP
- Handles all image operations (upload, get, delete, list, storage info)
- Comprehensive error handling
- Automatic connection management

**Methods:**

- `uploadImage(data: UploadImageRequest): Promise<UploadImageResponse>`
- `getImage(imageId: string): Promise<GetImageResponse>`
- `deleteImage(imageId: string): Promise<DeleteImageResponse>`
- `healthCheck(): Promise<HealthCheckResponse>`
- `listImages(): Promise<{ success: boolean; images: Array<...> }>`
- `getStorageInfo(): Promise<{ success: boolean; totalFiles: number; totalSize: string; uploadsDir: string }>`

### 2. ImageTestController (`src/controllers/image-test.controller.ts`)

A REST controller that provides HTTP endpoints to test the Image Service functionality.

**Endpoints:**

- `POST /image-test/upload` - Upload an image file
- `GET /image-test/image/:imageId` - Get image information
- `DELETE /image-test/image/:imageId` - Delete an image
- `GET /image-test/images` - List all images
- `GET /image-test/storage-info` - Get storage statistics
- `GET /image-test/health` - Health check
- `POST /image-test/test-upload` - Test upload with base64 content

## API Endpoints

### Upload Image

```http
POST /image-test/upload
Content-Type: multipart/form-data

file: [image file]
```

**Response:**

```json
{
  "success": true,
  "imageId": "img_1703123456789_abc123def",
  "filename": "test-image.png",
  "url": "/uploads/img_1703123456789_abc123def.png",
  "message": "Image uploaded successfully",
  "originalFile": {
    "originalname": "test-image.png",
    "mimetype": "image/png",
    "size": 95
  }
}
```

### Get Image Info

```http
GET /image-test/image/{imageId}
```

**Response:**

```json
{
  "success": true,
  "imageId": "img_1703123456789_abc123def",
  "url": "/uploads/img_1703123456789_abc123def.png",
  "metadata": {
    "size": "0.09MB",
    "format": "PNG",
    "dimensions": "Unknown"
  }
}
```

### Delete Image

```http
DELETE /image-test/image/{imageId}
```

**Response:**

```json
{
  "success": true,
  "imageId": "img_1703123456789_abc123def",
  "message": "Image deleted successfully"
}
```

### List All Images

```http
GET /image-test/images
```

**Response:**

```json
{
  "success": true,
  "images": [
    {
      "imageId": "img_1703123456789_abc123def",
      "filename": "img_1703123456789_abc123def.png",
      "size": "0.09MB",
      "format": "PNG"
    }
  ]
}
```

### Get Storage Info

```http
GET /image-test/storage-info
```

**Response:**

```json
{
  "success": true,
  "totalFiles": 1,
  "totalSize": "0.09MB",
  "uploadsDir": "/path/to/uploads"
}
```

### Health Check

```http
GET /image-test/health
```

**Response:**

```json
{
  "message": "Image Service is running!"
}
```

## Environment Variables

The integration uses the following environment variables:

- `IMAGE_SERVICE_HOST`: Image Service host (default: localhost)
- `IMAGE_SERVICE_PORT`: Image Service port (default: 3001)

## Testing

### Manual Testing

1. Start the Image Service:

   ```bash
   cd apps/image-service
   pnpm run dev
   ```

2. Start the Main API:

   ```bash
   cd apps/api
   pnpm run dev
   ```

3. Test the endpoints using curl or Postman:

   ```bash
   # Health check
   curl http://localhost:3000/image-test/health

   # Upload an image
   curl -X POST -F "file=@/path/to/image.jpg" http://localhost:3000/image-test/upload

   # List images
   curl http://localhost:3000/image-test/images
   ```

### Automated Testing

Run the test script:

```bash
cd apps/api
node test-image-service.js
```

This script will:

1. Test health check
2. Test storage info
3. Test image upload
4. Test image retrieval
5. Test image deletion
6. Verify all operations work correctly

## Error Handling

The integration includes comprehensive error handling:

- **Connection Errors**: If the Image Service is not available, operations return error responses
- **File Upload Errors**: Invalid files or upload failures are handled gracefully
- **Missing Files**: Attempts to access non-existent files return appropriate error messages
- **Network Timeouts**: TCP communication timeouts are handled with retry logic

## Security Considerations

- File uploads are validated for proper file types
- File sizes are not limited (consider adding limits for production)
- Original filenames are preserved in metadata but not used for storage
- Unique image IDs prevent filename conflicts
- No direct file system access is exposed through the API

## Future Enhancements

- Add file type validation
- Implement file size limits
- Add image processing (resizing, compression)
- Implement image metadata extraction
- Add authentication and authorization
- Implement file access controls
- Add backup and archival features
