import { Injectable } from '@nestjs/common';
import { ChatOpenAI } from '@langchain/openai';
import { AnswerStyle } from 'src/enums';

const casual_message =
  'Wygeneruj luźną odpowiedź w formie emaila używając tego samego języka.';
const neutral_message =
  'Wygeneruj neutralną odpowiedź w formie emaila używając tego samego języka.';
const formal_message =
  'Wygeneruj formalną odpowiedź w formie emaila używając tego samego języka.';
const default_message =
  'Wygeneruj odpowiedź w dowolnym stylu w formie emaila używając tego samego języka.';

@Injectable()
export class OpenaiService {
  private model: ChatOpenAI;

  constructor() {}

  create(apiKey: string) {
    this.model = new ChatOpenAI({
      modelName: 'gpt-3.5-turbo',
      temperature: 0.9,
      openAIApiKey: apiKey,
    });
  }

  async sendMessage(email: string, style: AnswerStyle): Promise<string> {
    const result = await this.model?.invoke(
      `${this.getContext(style)}\n${email}`,
    );
    return result?.content.toString();
  }

  private getContext(style: AnswerStyle): string {
    switch (style) {
      case AnswerStyle.Casual: {
        return casual_message;
      }
      case AnswerStyle.Neutral: {
        return neutral_message;
      }
      case AnswerStyle.Formal: {
        return formal_message;
      }
      default: {
        return default_message;
      }
    }
  }
}
