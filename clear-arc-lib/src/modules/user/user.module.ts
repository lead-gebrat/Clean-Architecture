/* eslint-disable*/

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { LoginUserUseCase } from './application/use-cases/login-user.use-case';
import { User, UserSchema } from './infrastructure/schemas/user.schema';
import { UserController } from './presentation/user.controller';
import { UserRepositoryImpl } from './infrastructure/persistence/user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    LoginUserUseCase,
    {
      provide: 'UserRepository',
      useClass: UserRepositoryImpl,
    },
  ],
  exports: ['UserRepository'],
})
export class UserModule {}
