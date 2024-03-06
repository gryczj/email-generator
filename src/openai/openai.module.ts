import { Module } from '@nestjs/common';
import { OpenaiController } from './openai.controller';
import { OpenaiService } from './openai.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  exports: [OpenaiService],
  controllers: [OpenaiController],
  providers: [OpenaiService],
})
export class OpenaiModule {}
