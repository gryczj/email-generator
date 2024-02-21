import { Injectable } from '@nestjs/common';
import { ChatOpenAI } from '@langchain/openai';
import { AnswerStyle } from 'src/enums';

@Injectable()
export class OpenaiService {
  private model: ChatOpenAI;

  constructor() {
    this.model = new ChatOpenAI({
      modelName: 'gpt-3.5-turbo',
      temperature: 0.9,
      openAIApiKey: process.env.OPENAI_API_KEY,
    });
  }

  async sendEmail(email: string, style: AnswerStyle) {
    const result = await this.model.invoke(
      `${this.getStyle(style)} + \n + ${email}`,
    );
    return result.content.toString();
  }

  private getStyle(style: AnswerStyle): string {
    switch (style) {
      case AnswerStyle.Casual: {
        return 'Generate casual email with the answer to following email. Use the same language';
      }
      case AnswerStyle.Neutral: {
        return 'Generate email as an answer in neutral style to following email. Use the same language';
      }
      case AnswerStyle.Formal: {
        return 'Generate formal email as an answer to following email. Use the same language';
      }
      default: {
        return 'Answer to following email as you want. Use the same language';
      }
    }
  }
}
