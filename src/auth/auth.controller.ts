import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() data: SignupDto) {
    return await this.authService.signup(data.email, data.password);
  }

  @Post('login')
  async login(@Body() data: LoginDto) {
    return await this.authService.login(data.email, data.password);
  }
}
