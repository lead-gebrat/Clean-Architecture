/* eslint-disable*/

import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../../domain/interface/user.repository';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class LoginUserUseCase {
  constructor(
    @Inject('UserRepository') private userRepository: UserRepository,
  ) {}

  async execute(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials');

    return jwt.sign({ userEmail: user.email }, 'your-secret-key', {
      expiresIn: '1h',
    });
  }
}
