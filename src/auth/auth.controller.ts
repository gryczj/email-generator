import { Body, Post, HttpCode, Controller, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, RegistrationDTO } from './dtos';
import { LoginResponse } from './login.response';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.OK)
  public async register(
    @Body() registrationDTO: RegistrationDTO,
  ): Promise<void> {
    return await this.authService.register(registrationDTO);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Body() loginDTO: LoginDTO): Promise<LoginResponse> {
    return await this.authService.login(loginDTO);
  }
}
