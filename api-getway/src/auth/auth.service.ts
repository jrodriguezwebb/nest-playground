import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { lastValueFrom } from 'rxjs';
import { UserMsg } from 'src/common/constants';
import { UserInterface } from 'src/common/interfaces/user.interface';
import { ClientProxySuperFlights } from 'src/common/proxy/client-proxy';
import { UserDTO } from 'src/user/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly clientProxy: ClientProxySuperFlights,
    private readonly jwtService: JwtService,
  ) {}

  private clientProxyUser = this.clientProxy.clientProxyUsers();

  async validateUser(
    userName: string,
    password: string,
  ): Promise<UserInterface | null> {
    const user = await lastValueFrom(
      this.clientProxyUser.send(UserMsg.VALID_USER, {
        userName,
        password,
      }),
    );

    if (user) return user;
    return null;
  }

  async signIn(user: any) {
    const payLoad = {
      username: user.userName,
      sub: user._id.toString(),
    };

    return { access_token: this.jwtService.sign(payLoad) };
  }

  async signUp(user: UserDTO) {
    return await lastValueFrom(this.clientProxyUser.send(UserMsg.CREATE, user));
  }
}
