import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PassengerDTO } from './dto/passenger.dto';
import { PassengerService } from './passenger.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('passenger')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
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
