<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ pnpm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

# Image Service

A microservice for handling image uploads, storage, and management with local file storage.

## Features

- **Local File Storage**: Images are stored locally in the `uploads/` directory
- **Image Upload**: Upload images with unique IDs and metadata
- **Image Retrieval**: Get image information and metadata
- **Image Deletion**: Remove images from local storage
- **Storage Management**: List all images and get storage statistics

## Local Storage

Images are stored in the `uploads/` directory at the root of the service. The service automatically creates this directory if it doesn't exist.

### File Naming Convention

- Images are stored with unique IDs: `img_{timestamp}_{randomString}.{extension}`
- Original filenames are preserved in metadata
- File extensions are maintained from the original upload

### Storage Structure

```
uploads/
├── img_1703123456789_abc123def.jpg
├── img_1703123456790_xyz789ghi.png
└── ...
```

## API Endpoints

### Microservice Patterns

The service uses TCP microservice patterns:

- `upload_image`: Upload a new image
- `get_image`: Retrieve image information
- `delete_image`: Delete an image
- `list_images`: List all stored images
- `get_storage_info`: Get storage statistics
- `health_check`: Service health check

### Request/Response Types

#### Upload Image

```typescript
interface UploadImageRequest {
  file: Buffer;
  filename: string;
}

interface UploadImageResponse {
  success: boolean;
  imageId: string;
  filename: string;
  url: string;
  message: string;
}
```

#### Get Image

```typescript
interface GetImageRequest {
  imageId: string;
}

interface GetImageResponse {
  success: boolean;
  imageId: string;
  url: string;
  metadata: {
    size: string;
    format: string;
    dimensions: string;
  };
}
```

#### Delete Image

```typescript
interface DeleteImageRequest {
  imageId: string;
}

interface DeleteImageResponse {
  success: boolean;
  imageId: string;
  message: string;
}
```

## Development

### Prerequisites

- Node.js
- pnpm

### Installation

```bash
pnpm install
```

### Running the Service

```bash
# Development mode
pnpm run dev

# Production mode
pnpm run start:prod
```

### Environment Variables

- `IMAGE_SERVICE_PORT`: Service port (default: 3001)
- `IMAGE_SERVICE_HOST`: Service host (default: localhost)

## Storage Management

### List All Images

Returns a list of all stored images with their metadata:

```typescript
{
  success: boolean;
  images: Array<{
    imageId: string;
    filename: string;
    size: string;
    format: string;
  }>;
}
```

### Get Storage Info

Returns storage statistics:

```typescript
{
  success: boolean;
  totalFiles: number;
  totalSize: string;
  uploadsDir: string;
}
```

## Error Handling

The service includes comprehensive error handling:

- File system errors are logged and returned with appropriate messages
- Missing files return success: false with descriptive messages
- All operations are wrapped in try-catch blocks

## Security Considerations

- Files are stored with unique IDs to prevent conflicts
- Original filenames are preserved in metadata but not used for storage
- File extensions are validated and preserved
- No direct file system access is exposed

## Future Enhancements

- Image processing (resizing, compression)
- File type validation
- Storage quotas and limits
- Image metadata extraction (dimensions, EXIF data)
- Backup and archival features
