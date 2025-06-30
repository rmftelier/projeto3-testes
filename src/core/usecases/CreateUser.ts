import { randomUUID } from 'crypto';
import { User } from '../entities/User';
import { UserRepository } from '../repositories/UserRepository';

export interface ICreateUserInput {
  name: string;
  login: string;
  email: string;
  password: string;
}

export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(data: ICreateUserInput): Promise<User> {
    const existing = await this.userRepository.findByEmail(data.email);
    if (existing) {
      throw new Error('Usuário já existe com esse e-mail');
    }

    const user = new User(
      randomUUID(),
      data.name,
      data.login,
      data.email,
      data.password
    );

    await this.userRepository.save(user);

    return user;
  }
}
