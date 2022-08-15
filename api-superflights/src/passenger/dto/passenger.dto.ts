import { IsNotEmpty, IsString } from 'class-validator';

export class PassengerDTO {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
  @IsNotEmpty()
  @IsString()
  readonly email: string;
}
