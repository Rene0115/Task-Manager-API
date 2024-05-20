import { IsEmail, IsString, MinLength } from 'class-validator';
import { Request } from 'express';

export class SignupDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(5)
  readonly password: string;
}

export class LoginDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;
}

export interface UserRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}
