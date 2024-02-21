import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { EmailService } from './email.service';
import { AnswerStyle } from 'src/enums';

@Controller('email')
export class EmailController {
  private answers: string[] = [];
  constructor(private emailService: EmailService) {
    this.answers = [];
  }

  @Post('process')
  async process(
    @Body() body: { emailContent: string; answerStyle: AnswerStyle },
    @Res() res: Response,
  ): Promise<any> {
    const answer = await this.emailService.sendEmail(
      body.emailContent,
      body.answerStyle,
    );

    this.answers.push(answer);

    console.log(answer);

    return res.render('answer', {
      answers: this.answers,
    });
  }
}
