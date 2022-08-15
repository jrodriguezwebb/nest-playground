import { HttpStatus, Injectable } from '@nestjs/common';
import { PassengerInterface } from 'src/common/interfaces/passenger.interface';
import { PassengerDTO } from './dto/passenger.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PASSENGER } from 'src/common/models/models';
import { Model } from 'mongoose';

@Injectable()
export class PassengerService {
  constructor(
    @InjectModel(PASSENGER.name)
    private readonly model: Model<PassengerInterface>,
  ) {}

  async create(PassengerDTO: PassengerDTO): Promise<PassengerInterface> {
    const newPassenger = new this.model(PassengerDTO);
    return await newPassenger.save();
  }

  async findAll(): Promise<PassengerInterface[]> {
    return await this.model.find();
  }

  async findOne(id: string): Promise<PassengerInterface> {
    return await this.model.findById(id);
  }

  async update(
    id: string,
    PassengerDTO: PassengerDTO,
  ): Promise<PassengerInterface> {
    return await this.model.findByIdAndUpdate(id, PassengerDTO);
  }

  async delete(id: string) {
    // TODO: VALIDATE THIS
    await this.model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, message: 'Deleted' };
  }
}
