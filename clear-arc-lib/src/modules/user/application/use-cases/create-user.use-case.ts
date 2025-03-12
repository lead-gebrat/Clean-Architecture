/* eslint-disable */

import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/interface/user.repository';
import { UserEntity } from '../../domain/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('UserRepository') private userRepository: UserRepository,
  ) {}

  async execute(
    name: string,
    email: string,
    password: string,
  ): Promise<UserEntity> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserEntity(name, email, password);
    return this.userRepository.create(
      new UserEntity(user.name, user.email, hashedPassword),
    );
  }
}
