import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { AnswerStyle } from 'src/enums';

@Controller('email')
export class EmailController {
  constructor(private emailService: EmailService) {}

  @Post('process')
  process(
    @Body() body: { emailContent: string; answerStyle: AnswerStyle },
  ): any {
    console.log(body);
    return this.emailService.sendEmail(body.emailContent, body.answerStyle);
  }
}
