import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PassengerDTO } from './dto/passenger.dto';
import { PassengerService } from './passenger.service';

@Controller('api/v1/passenger')
export class PassengerController {
  constructor(readonly PassengerService: PassengerService) {}

  @Post()
  create(@Body() PassengerDTO: PassengerDTO) {
    return this.PassengerService.create(PassengerDTO);
  }

  @Get()
  findAll() {
    return this.PassengerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.PassengerService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() PassengerDTO: PassengerDTO) {
    return this.PassengerService.update(id, PassengerDTO);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.PassengerService.delete(id);
  }
}
