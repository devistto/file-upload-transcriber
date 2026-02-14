import "dotenv/config"
import { NestFactory } from '@nestjs/core';
import { AppModule } from "./app.module"
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const validationOptionsObj = {
    whitelist: true,
    transform: true,
    stopAtFirstError: true
  }

  app.useGlobalPipes(new ValidationPipe(validationOptionsObj))

  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
