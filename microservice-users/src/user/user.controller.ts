import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserMsg } from 'src/common/constants';

@Controller()
export class UserController {
  constructor(readonly userService: UserService) {}
  @MessagePattern(UserMsg.CREATE)
  create(@Payload() userDTO: UserDTO) {
    return this.userService.create(userDTO);
  }

  @MessagePattern(UserMsg.FIND_ALL)
  findAll() {
    return this.userService.findAll();
  }

  @MessagePattern(UserMsg.FIND_ONE)
  findOne(@Payload() id: string) {
    return this.userService.findOne(id);
  }

  // TODO: revisar luego
  @MessagePattern(UserMsg.UPDATE)
  update(@Payload() payload: any) {
    return this.userService.update(payload.id, payload.userDTO);
  }

  @MessagePattern(UserMsg.DELETE)
  delete(@Payload() id: string) {
    return this.userService.delete(id);
  }
}
