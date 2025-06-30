import { UserRepository } from '../repositories/UserRepository';
import { User } from '../entities/User';

interface UpdateUserInput {
  name?: string;
  login?: string;
  email?: string;
  password?: string;
}

export class UpdateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string, data: UpdateUserInput): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    if (data.name) user.name = data.name;
    if (data.login) user.login = data.login;
    if (data.email) user.email = data.email;
    if (data.password) user.password = data.password;

    return user;
  }
}
