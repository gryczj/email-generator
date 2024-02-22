import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { LoginDTO, RegistrationDTO } from './dtos';
import { LoginResponse } from './login.response';

@Injectable()
export class AuthService {
  constructor(private usersRepository: UsersRepository) {}

  async register({
    username,
    password,
    openAIKey,
  }: RegistrationDTO): Promise<any> {
    return this.usersRepository.getAll();
  }

  async login({ username, password }: LoginDTO): Promise<LoginResponse> {
    return {} as LoginResponse;
  }
}
