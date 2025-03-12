/*eslint-disable*/

import { User } from '../../infrastructure/schemas/user.schema';

export interface UserRepository {
  create(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}
