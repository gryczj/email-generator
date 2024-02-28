import { Body, Post, HttpCode, Controller, HttpStatus, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, RegistrationDTO } from './dtos';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.OK)
  public async register(
    @Body() registrationDTO: RegistrationDTO,
  ): Promise<void> {
    console.log(registrationDTO);
    return await this.authService.register(registrationDTO);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Body() loginDTO: LoginDTO): Promise<{access_token: string}> {
    return await this.authService.login(loginDTO);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
