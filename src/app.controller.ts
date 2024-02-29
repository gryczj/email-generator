import { Controller, Get, Render, Res } from '@nestjs/common';
import { Response } from 'express';

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
}
