import { ApiTags } from '@nestjs/swagger';
import { ClientProxySuperFlights } from 'src/common/proxy/client-proxy';
import { FlightDTO } from './dto/flight.dto';
import { FlightInterface } from 'src/common/interfaces/flight.interface';
import { FlightMsg } from 'src/common/constants';
import { Observable } from 'rxjs';
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

@ApiTags('flights')
@Controller('api/v2/flight')
export class FlightController {
  constructor(private readonly clientProxy: ClientProxySuperFlights) {}

  private clientProxyFlight = this.clientProxy.clientProxyFlights();

  @Post()
  create(@Body() flightDTO: FlightDTO) {
    return this.clientProxyFlight.send(FlightMsg.CREATE, flightDTO);
  }

  @Get()
  findAll(): Observable<FlightInterface[]> {
    return this.clientProxyFlight.send(FlightMsg.FIND_ALL, '');
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<FlightInterface> {
    return this.clientProxyFlight.send(FlightMsg.FIND_ONE, id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() flightDTO: FlightDTO,
  ): Observable<FlightInterface> {
    return this.clientProxyFlight.send(FlightMsg.UPDATE, {
      id,
      flightDTO,
    });
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.clientProxyFlight.send(FlightMsg.DELETE, id);
  }

  @Post(':flightId/passenger/:passengerId')
  async addPassenger(@Param() flightId: string, @Param() passengerId: string) {
    const passenger = await this.clientProxyFlight
      .send(FlightMsg.FIND_ONE, passengerId)
      .toPromise();
    if (!passenger)
      throw new HttpException('Passanger not found', HttpStatus.NOT_FOUND);

    return this.clientProxyFlight.send(FlightMsg.ADD_PASSANGER, {
      flightId,
      passengerId,
    });
  }
}
