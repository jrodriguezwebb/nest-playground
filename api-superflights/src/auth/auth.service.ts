import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserInterface } from 'src/common/interfaces/user.interface';
import { UserDTO } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    userName: string,
    password: string,
  ): Promise<UserInterface | null> {
    const user = await this.userService.findByUserName(userName);
    const isValidPassword = await this.userService.checkPassword(
      password,
      user.password,
    );

    if (user && isValidPassword) return user;
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
    return this.userService.create(user);
  }
}
