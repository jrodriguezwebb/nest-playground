import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { RabbitMQ } from '../constants';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class ClientProxySuperFlights {
  constructor(private readonly config: ConfigService) {}

  clientProxyUsers(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: this.config.get('AMQP_URL'),
        queue: RabbitMQ.UserQeue,
      },
    });
  }
}
