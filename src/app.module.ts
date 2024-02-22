import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailController } from './email/email.controller';
import { EmailService } from './email/email.service';
import { OpenaiService } from './openai/openai.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule],
  controllers: [AppController, EmailController],
  providers: [AppService, EmailService, OpenaiService],
})
export class AppModule {}
