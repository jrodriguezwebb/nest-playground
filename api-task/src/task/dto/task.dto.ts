import { IsBoolean, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class TaskDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  description: string;
  @IsNotEmpty()
  @IsBoolean()
  isDone: boolean;
}
