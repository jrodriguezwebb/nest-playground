import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { PASSENGER } from 'src/common/models/models';
import { PassengerInterface } from 'src/common/interfaces/passenger.interface';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

/* export const FlightSchema = new mongoose.Schema(
  {
    pilot: { type: String, required: true },
    airplane: { type: String, required: true },
    destinationCity: { type: String, required: true },
    flightDate: { type: Date, required: true },
    passengers: [{ type: mongoose.Schema.Types.ObjectId, ref: PASSENGER.name }],
  },
  { timestamps: true },
); */

export type FlightDocument = Flight & Document;

@Schema()
export class Flight {
  @Prop()
  pilot: string;

  @Prop()
  airplane: string;

  @Prop()
  destinationCity: string;

  @Prop()
  flightDate: Date;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: PASSENGER.name }],
  })
  passengers: PassengerInterface[];
}

export const FlightSchema = SchemaFactory.createForClass(Flight);
