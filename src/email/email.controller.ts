import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { EmailService } from './email.service';
import { AnswerStyle } from 'src/enums';
import { AuthGuard } from 'src/user/auth.guard';

@UseGuards(AuthGuard)
@Controller('email')
export class EmailController {
  constructor(private emailService: EmailService) {}

  @Post('send')
  async send(
    @Body() body: { emailContent: string; answerStyle: AnswerStyle },
    @Res() res: Response,
  ): Promise<void> {
    const answer = await this.emailService.send(
      body.emailContent,
      body.answerStyle,
    );

    return res.render('answer', {
      answer,
    });
  }
}
