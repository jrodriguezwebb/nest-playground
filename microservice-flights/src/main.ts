import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { RabbitMQ } from './common/constants';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.AMQP_URL],
      queue: RabbitMQ.FlightQeue,
    },
  });
  app
    .listen()
    .then(() => {
      console.log('Listening microservice');
    })
    .catch((error) => console.log(error));
}
bootstrap();
