import { ApiTags } from '@nestjs/swagger';
import { ClientProxySuperFlights } from 'src/common/proxy/client-proxy';
import { Observable } from 'rxjs';
import { PassengerDTO } from './dto/passenger.dto';
import { PassengerInterface } from 'src/common/interfaces/passenger.interface';
import { PassengerMsg } from 'src/common/constants';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@ApiTags('passanger')
@Controller('api/v2/passenger')
export class PassangerController {
  constructor(private readonly clientProxy: ClientProxySuperFlights) {}

  private clientProxyPassenger = this.clientProxy.clientProxyPassengers();

  @Post()
  create(@Body() passengerDTO: PassengerDTO) {
    return this.clientProxyPassenger.send(PassengerMsg.CREATE, passengerDTO);
  }

  @Get()
  findAll(): Observable<PassengerInterface[]> {
    return this.clientProxyPassenger.send(PassengerMsg.FIND_ALL, '');
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<PassengerInterface> {
    return this.clientProxyPassenger.send(PassengerMsg.FIND_ONE, id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() passengerDTO: PassengerDTO,
  ): Observable<PassengerInterface> {
    return this.clientProxyPassenger.send(PassengerMsg.UPDATE, {
      id,
      passengerDTO,
    });
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.clientProxyPassenger.send(PassengerMsg.DELETE, id);
  }
}
