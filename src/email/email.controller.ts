import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { EmailService } from './email.service';
import { AnswerStyle } from 'src/enums';

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
