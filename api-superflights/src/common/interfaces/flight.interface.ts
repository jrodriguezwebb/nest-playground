import { PassengerInterface } from './passenger.interface';
import { Document } from 'mongoose';

export interface FlightInterface extends Document {
  pilot: string;
  airplane: string;
  destinationCity: string;
  flightDate: string;
  passengers?: PassengerInterface[];
}
