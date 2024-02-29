import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { UsersRepository } from 'src/auth/users.repository';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('openai')
export class OpenaiController {
  constructor(
    private openaiService: OpenaiService,
    private userRepository: UsersRepository,
  ) {}

  @Get('create')
  async create(@Req() req) {
    const username = req.user.username;
    const userKey = (await this.userRepository.find(username)).open_ai_key;
    this.openaiService.create(userKey);
  }
}
