import { IsEmail, IsString, MinLength } from 'class-validator';

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
