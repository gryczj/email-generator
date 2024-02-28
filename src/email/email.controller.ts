import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { EmailService } from './email.service';
import { AnswerStyle } from 'src/enums';
import { AuthGuard } from 'src/auth/auth.guard';
import { CurrentUser, User } from 'src/auth/current-user.decorator';

// @UseGuards(AuthGuard)
@Controller('email')
export class EmailController {
  constructor(private emailService: EmailService) {}

  @Post('send')
  async send(
    @CurrentUser() user: User,
    @Body() body: { emailContent: string; answerStyle: AnswerStyle },
    @Req() req,
    @Res() res: Response,
  ): Promise<void> {
    console.log("USER", user)
    const answer = await this.emailService.send(
      body.emailContent,
      body.answerStyle,
    );

    return res.render('answer', {
      answer,
    });
  }
}
