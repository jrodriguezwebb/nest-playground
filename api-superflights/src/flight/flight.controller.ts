import { FlightDTO } from './dto/flight.dto';
import { FlightService } from './flight.service';
import { PassengerService } from '../passenger/passenger.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('api/v1/flight')
export class FlightController {
  constructor(
    private readonly FlightService: FlightService,
    private readonly passengerService: PassengerService,
  ) {}

  @Post()
  create(@Body() FlightDTO: FlightDTO) {
    return this.FlightService.create(FlightDTO);
  }

  @Get()
  findAll() {
    return this.FlightService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.FlightService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() FlightDTO: FlightDTO) {
    return this.FlightService.update(id, FlightDTO);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.FlightService.delete(id);
  }

  @Post(':flightID/passenger/:passengerId')
  async addPassenger(
    @Param('flightID') flightID: string,
    @Param('passengerId') passengerId: string,
  ) {
    const passenger = await this.passengerService.findOne(passengerId);
    if (!passenger) {
      throw new HttpException('Passenger not found', HttpStatus.NOT_FOUND);
    }
    return this.FlightService.addPassenger(flightID, passengerId);
  }
}
