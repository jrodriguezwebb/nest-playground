import { HttpStatus, Injectable } from '@nestjs/common';
import { UserInterface } from 'src/common/interfaces/user.interface';
import { UserDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { USER } from 'src/common/models/models';
import { Model } from 'mongoose';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(USER.name) private readonly model: Model<UserInterface>,
  ) {}
  async hashPasword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async checkPassword(password: string, passwordDb: string): Promise<boolean> {
    return await bcrypt.compare(password, passwordDb);
  }

  async create(userDTO: UserDTO): Promise<UserInterface> {
    const hash = await this.hashPasword(userDTO.password);
    const newUser = new this.model({ ...userDTO, password: hash });
    return await newUser.save();
  }

  async findAll(): Promise<UserInterface[]> {
    return await this.model.find();
  }

  async findOne(id: string): Promise<UserInterface> {
    return await this.model.findById(id);
  }

  async findByUserName(userName: string): Promise<UserInterface> {
    return await this.model.findOne({ userName });
  }

  async update(id: string, userDTO: UserDTO): Promise<UserInterface> {
    const hash = await this.hashPasword(userDTO.password);
    const user = { ...userDTO, password: hash };
    return await this.model.findByIdAndUpdate(id, user);
  }

  async delete(id: string) {
    await this.model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, message: 'Deleted' };
  }
}
