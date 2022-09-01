import { PassengerDTO } from './dto/passenger.dto';
import { PassengerService } from './passenger.service';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PassengerMsg } from 'src/common/constants';

@Controller('api/v2/passenger')
export class PassengerController {
  constructor(readonly PassengerService: PassengerService) {}

  @MessagePattern(PassengerMsg.CREATE)
  create(@Payload() PassengerDTO: PassengerDTO) {
    return this.PassengerService.create(PassengerDTO);
  }

  @MessagePattern(PassengerMsg.FIND_ALL)
  findAll() {
    return this.PassengerService.findAll();
  }

  @MessagePattern(PassengerMsg.FIND_ONE)
  findOne(@Payload() id: string) {
    return this.PassengerService.findOne(id);
  }

  @MessagePattern(PassengerMsg.UPDATE)
  update(@Payload() payload: any) {
    return this.PassengerService.update(payload.id, payload.passengerDTO);
  }

  @MessagePattern(PassengerMsg.DELETE)
  delete(@Payload() id: string) {
    return this.PassengerService.delete(id);
  }
}
