import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserMsg } from 'src/common/constants';
import { UserInterface } from 'src/common/interfaces/user.interface';
import { ClientProxySuperFlights } from 'src/common/proxy/client-proxy';
import { UserDTO } from './dto/user.dto';

@Controller('api/v2/user')
export class UserController {
  constructor(private readonly clientProxy: ClientProxySuperFlights) {}

  private clientProxyUser = this.clientProxy.clientProxyUsers();

  @Post()
  create(@Body() userDto: UserDTO) {
    return this.clientProxyUser.send(UserMsg.CREATE, userDto);
  }

  @Get()
  findAll(): Observable<UserInterface[]> {
    return this.clientProxyUser.send(UserMsg.FIND_ALL, '');
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<UserInterface> {
    return this.clientProxyUser.send(UserMsg.FIND_ONE, id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() userDTO: UserDTO,
  ): Observable<UserInterface> {
    return this.clientProxyUser.send(UserMsg.UPDATE, { id, userDTO });
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.clientProxyUser.send(UserMsg.DELETE, id);
  }
}