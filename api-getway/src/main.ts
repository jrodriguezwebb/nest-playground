import { AllExceptionFilter } from './common/filters/http-exception.filter';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { TimeOutInterceptor } from './common/interceptors/timeout.interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalInterceptors(new TimeOutInterceptor());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
