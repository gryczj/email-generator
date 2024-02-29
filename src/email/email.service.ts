import { Injectable } from '@nestjs/common';
import { AnswerStyle } from 'src/enums';
import { OpenaiService } from 'src/openai/openai.service';

@Injectable()
export class EmailService {
  constructor(private openaiService: OpenaiService) {}

  async send(email: string, style: AnswerStyle): Promise<string> {
    return this.openaiService.sendMessage(email, style);
  }
}
