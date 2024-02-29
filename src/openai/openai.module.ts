import { Module } from '@nestjs/common';
import { OpenaiController } from './openai.controller';
import { OpenaiService } from './openai.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  exports: [OpenaiService],
  controllers: [OpenaiController],
  providers: [OpenaiService],
})
export class OpenaiModule {}
