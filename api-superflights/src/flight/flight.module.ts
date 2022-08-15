import { FLIGHT } from 'src/common/models/models';
import { FlightController } from './flight.controller';
import { FlightSchema } from './schema/flight.schema';
import { FlightService } from './flight.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassengerModule } from '../passenger/passenger.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: FLIGHT.name,
        useFactory: async () => {
          return FlightSchema.plugin(await require('mongoose-autopopulate'));
        },
      },
    ]),
    PassengerModule,
  ],
  controllers: [FlightController],
  providers: [FlightService],
})
export class FlightModule {}
