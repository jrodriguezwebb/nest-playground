import { AllExceptionFilter } from './common/filters/http-exception.filter';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { TimeOutInterceptor } from './common/interceptors/timeout.interceptors';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalInterceptors(new TimeOutInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
