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
import { UserService } from './user.service';
import { LoginDTO, RegistrationDTO } from './dtos';
import { AuthGuard } from './auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  @HttpCode(HttpStatus.OK)
  public async register(
    @Body() registrationDTO: RegistrationDTO,
    @Res() res: Response,
  ): Promise<void> {
    try {
      await this.userService.register(registrationDTO);
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
      const token = await this.userService.login(loginDTO);
      res.cookie('access_token', token.access_token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
      });
      res.redirect('/generatorView');
    } catch (error) {
      res.status(401).json({ error });
      console.error(error);
    }
  }

  @UseGuards(AuthGuard)
  @Get('logout')
  @HttpCode(HttpStatus.OK)
  public async logout(@Res() res: Response): Promise<void> {
    res.clearCookie('access_token');
    res.redirect('/loginView');
  }

  @UseGuards(AuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  public async getUserInfo(
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<void> {
    const user = await this.userService.getUserInfo(req['user'].username);
    res.render('user-info', {
      user,
    });
  }

  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(HttpStatus.OK)
  public async userUpdate(
    @Body() body: { openAIKey: string; username: string },
    @Res() res: Response,
  ): Promise<void> {
    try {
      await this.userService.updateUser(body.username, body.openAIKey);
      res.redirect('/user');
    } catch (error) {
      res.status(409).json({ error });
      console.error(error);
    }
  }

  @UseGuards(AuthGuard)
  @Get('editView')
  public async userEdit(
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<void> {
    const user = await this.userService.getUserInfo(req['user'].username);
    res.render('user-form', {
      user,
    });
  }
}
