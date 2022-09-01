import { FLIGHT, PASSENGER } from 'src/common/models/models';
import { FlightDTO } from './dto/flight.dto';
import { FlightInterface } from 'src/common/interfaces/flight.interface';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class FlightService {
  constructor(
    @InjectModel(FLIGHT.name)
    private readonly model: Model<FlightInterface>,
  ) {}

  async create(FlightDTO: FlightDTO): Promise<FlightInterface> {
    const newFlight = new this.model(FlightDTO);
    return await newFlight.save();
  }

  async findAll(): Promise<FlightInterface[]> {
    return await this.model.find().populate(PASSENGER.name);
  }

  async findOne(id: string): Promise<FlightInterface> {
    return await this.model.findById(id).populate(PASSENGER.name);
  }

  async update(id: string, FlightDTO: FlightDTO): Promise<FlightInterface> {
    return await this.model.findByIdAndUpdate(id, FlightDTO);
  }

  async delete(id: string) {
    // TODO: VALIDATE THIS
    await this.model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, message: 'Deleted' };
  }

  async addPassenger(
    flightID: string,
    passengerId: string,
  ): Promise<FlightInterface> {
    return await this.model
      .findByIdAndUpdate<FlightInterface>(flightID, {
        $addToSet: {
          passengers: passengerId as any,
        },
      })
      .populate(PASSENGER.name);
  }
}
