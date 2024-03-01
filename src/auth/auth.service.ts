import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from './users.repository';
import { LoginDTO, RegistrationDTO } from './dtos';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async register({
    username,
    password,
    openAIKey,
  }: RegistrationDTO): Promise<any> {
    const user = await this.usersRepository.find(username);
    if (user) {
      throw new ConflictException('User with given username already exists.');
    }
    const hash = await bcrypt.hash(password, 10);
    await this.usersRepository.save(username, hash, openAIKey);
  }

  async login({
    username,
    password,
  }: LoginDTO): Promise<{ access_token: string }> {
    const user = await this.usersRepository.find(username);
    if (!user || !(await bcrypt.compare(password, user.pwd))) {
      throw new UnauthorizedException('Invalid username or password.');
    }

    const payload = { sub: user.user_id, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async getUserInfo(
    username: string,
  ): Promise<{ username: string; openAIKey: string }> {
    const user = await this.usersRepository.find(username);

    return {
      username: user.username,
      openAIKey: user.open_ai_key,
    };
  }
}
