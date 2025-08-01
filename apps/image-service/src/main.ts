import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const port = parseInt(process.env.IMAGE_SERVICE_PORT || '3001');
  const logger = new Logger('ImageService');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.IMAGE_SERVICE_HOST || 'localhost',
        port,
      },
    },
  );

  await app.listen();
  logger.log(`Image microservice is listening on port ${port}`);
}
bootstrap();
