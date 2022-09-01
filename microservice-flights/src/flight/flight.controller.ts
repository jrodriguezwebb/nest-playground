import { FlightDTO } from './dto/flight.dto';
import { FlightService } from './flight.service';
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
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FlightMsg } from 'src/common/constants';

@Controller()
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  @MessagePattern(FlightMsg.CREATE)
  create(@Payload() FlightDTO: FlightDTO) {
    return this.flightService.create(FlightDTO);
  }

  @MessagePattern(FlightMsg.FIND_ALL)
  findAll() {
    return this.flightService.findAll();
  }

  @MessagePattern(FlightMsg.FIND_ONE)
  findOne(@Payload() id: string) {
    return this.flightService.findOne(id);
  }

  @MessagePattern(FlightMsg.UPDATE)
  update(@Payload() payload: any) {
    return this.flightService.update(payload.id, payload.lightDTO);
  }

  @MessagePattern(FlightMsg.DELETE)
  delete(@Payload() id: string) {
    return this.flightService.delete(id);
  }

  @MessagePattern(FlightMsg.ADD_PASSANGER)
  addPassenger(@Payload('flightID') payload: any) {
    return this.flightService.addPassenger(
      payload.flightID,
      payload.passengerId,
    );
  }
}
