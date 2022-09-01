import { FLIGHT, PASSENGER } from 'src/common/models/models';
import { FlightController } from './flight.controller';
import { FlightSchema } from './schema/flight.schema';
import { FlightService } from './flight.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassengerSchema } from './schema/passenger.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: FLIGHT.name,
        useFactory: async () => {
          return FlightSchema.plugin(await require('mongoose-autopopulate'));
        },
      },
      {
        name: PASSENGER.name,
        useFactory: async () => {
          return PassengerSchema;
        },
      },
    ]),
  ],
  controllers: [FlightController],
  providers: [FlightService],
})
export class FlightModule {}
