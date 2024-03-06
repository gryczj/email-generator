import { Controller, Get, Render, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from './user/auth.guard';
import { createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator((data, req) => req.user);
@Controller()
export class AppController {
  constructor() {}

  @Get()
  @Render('index')
  root(): void {}

  @Get('registrationView')
  public async registrationView(@Res() res: Response): Promise<void> {
    res.render('registration');
  }

  @Get('loginView')
  public async loginView(@Res() res: Response): Promise<void> {
    res.render('login');
  }

  @UseGuards(AuthGuard)
  @Get('generatorView')
  public async generatorView(@Res() res: Response): Promise<void> {
    res.render('email-form');
  }

  @Get('listView')
  public async listView(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    if (req.headers['cookie']) {
      res.render('list-authenticated');
    } else {
      res.render('list-unauthenticated');
    }
  }
}
