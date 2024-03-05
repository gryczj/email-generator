import { Controller, Get, Render, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from './auth/auth.guard';

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

  @Get('defaultListView')
  public async defaultListView(@Res() res: Response): Promise<void> {
    res.render('list-unauthenticated');
  }

  @UseGuards(AuthGuard)
  @Get('listView')
  public async listView(@Res() res: Response): Promise<void> {
    res.render('list-authenticated');
  }
}
