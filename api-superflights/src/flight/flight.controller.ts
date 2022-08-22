import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
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
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('flight')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v1/flight')
export class FlightController {
  constructor(
    private readonly flightService: FlightService,
    private readonly passengerService: PassengerService,
  ) {}

  @Post()
  create(@Body() FlightDTO: FlightDTO) {
    return this.flightService.create(FlightDTO);
  }

  @Get()
  findAll() {
    return this.flightService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.flightService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() FlightDTO: FlightDTO) {
    return this.flightService.update(id, FlightDTO);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.flightService.delete(id);
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
    return this.flightService.addPassenger(flightID, passengerId);
  }
}
