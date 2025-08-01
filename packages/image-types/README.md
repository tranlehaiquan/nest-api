# @nest-api/image-types

Shared TypeScript types for image service communication.

## Installation

This package is part of the monorepo and is automatically available to other packages.

## Usage

```typescript
import {
  UploadImageRequest,
  UploadImageResponse,
  GetImageRequest,
  GetImageResponse,
  DeleteImageRequest,
  DeleteImageResponse,
  HealthCheckResponse,
  ImageServicePatterns,
  ImageServiceResponses,
} from "@nest-api/image-types";
```

## Types

### Request/Response Types

- `UploadImageRequest` - Image upload request
- `UploadImageResponse` - Image upload response
- `GetImageRequest` - Get image request
- `GetImageResponse` - Get image response
- `DeleteImageRequest` - Delete image request
- `DeleteImageResponse` - Delete image response
- `HealthCheckResponse` - Health check response

### Message Pattern Types

- `ImageServicePatterns` - Microservice message patterns
- `ImageServiceResponses` - Microservice response types

## Development

```bash
# Build the package
pnpm build

# Watch for changes
pnpm dev

# Clean build artifacts
pnpm clean
```
