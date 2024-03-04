import {
  Body,
  Post,
  HttpCode,
  Controller,
  HttpStatus,
  Get,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
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
    @Res() res: Response,
  ): Promise<void> {
    try {
      await this.authService.register(registrationDTO);
      res.redirect('/loginView');
    } catch (error) {
      res.status(409).json({ error });
      console.error(error);
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(
    @Body() loginDTO: LoginDTO,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const token = await this.authService.login(loginDTO);
      res.cookie('access_token', token.access_token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
    })
      res.redirect('/generatorView');
    } catch (error) {
      res.status(401).json({ error });
      console.error(error);
    }
  }

  @UseGuards(AuthGuard)
  @Get('logout')
  @HttpCode(HttpStatus.OK)
  public async logout(
    @Res() res: Response,
    ): Promise<void> {
      res.clearCookie('access_token');
      res.redirect('/');
  }

  @UseGuards(AuthGuard)
  @Get('user-info')
  @HttpCode(HttpStatus.OK)
  public async getUserInfo(
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<void> {
    const user = this.authService.getUserInfo(req['user'].username);

    res.render('user-info', {
      user,
    });
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
