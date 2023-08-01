import { User } from '../entities/user.entity';
import {
  IsEmail,
  IsString,
  IsStrongPassword,
} from 'class-validator';


export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsStrongPassword({
    minLength: 6,
    minNumbers:2,
    minLowercase:1,
    minUppercase:1,
    minSymbols:1
})
  password: string;

  @IsString()
  name: string;
}
