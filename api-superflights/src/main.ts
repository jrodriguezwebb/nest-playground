import { AllExceptionFilter } from './common/filters/http-exception.filter';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { TimeOutInterceptor } from './common/interceptors/timeout.interceptors';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalInterceptors(new TimeOutInterceptor());
  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
    .setTitle('SuperFlights API')
    .setDescription('Schudeled Flights App')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('/api/docs', app, document, {
    swaggerOptions: { filter: true },
  });

  await app.listen(process.env.APP_PORT || 3000);
}
bootstrap();
