import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailController } from './email/email.controller';
import { EmailService } from './email/email.service';
import { OpenaiService } from './openai/openai.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { KyselyModule } from 'nestjs-kysely';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    KyselyModule.forRoot({
      dialect: new PostgresDialect({
        pool: new Pool({
          host: process.env.POSTGRES_HOST,
          port: Number(process.env.POSTGRES_PORT),
          user: process.env.POSTGRES_USER,
          password: process.env.POSTGRES_PASSWORD,
          database: process.env.POSTGRES_DB,
        }),
      }),
    }),
  ],
  controllers: [AppController, EmailController],
  providers: [AppService, EmailService, OpenaiService],
})
export class AppModule {}
