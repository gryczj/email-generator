import { Injectable } from '@nestjs/common';
import { AnswerStyle } from 'src/enums';
import { OpenaiService } from 'src/openai/openai.service';

@Injectable()
export class EmailService {
  constructor(private openaiService: OpenaiService) {}

  public sendEmail(email: string, style: AnswerStyle) {
    return this.openaiService.sendEmail(email, style);
  }
}
