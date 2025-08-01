# Image Service Integration

## Overview

The main API now includes integration with the Image Service microservice for local image storage.

## API Endpoints

### Upload Image

```http
POST /image-test/upload
Content-Type: multipart/form-data
```

### Get Image Info

```http
GET /image-test/image/{imageId}
```

### Delete Image

```http
DELETE /image-test/image/{imageId}
```

### List All Images

```http
GET /image-test/images
```

### Get Storage Info

```http
GET /image-test/storage-info
```

### Health Check

```http
GET /image-test/health
```

## Testing

1. Start Image Service: `cd apps/image-service && pnpm run dev`
2. Start Main API: `cd apps/api && pnpm run dev`
3. Run test script: `node test-image-service.js`

## Environment Variables

- `IMAGE_SERVICE_HOST`: localhost (default)
- `IMAGE_SERVICE_PORT`: 3001 (default)
