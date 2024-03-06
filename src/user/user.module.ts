import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UsersRepository } from './users.repository';

@Module({
  exports: [UsersRepository],
  controllers: [UserController],
  providers: [UserService, UsersRepository],
})
export class UserModule {}
