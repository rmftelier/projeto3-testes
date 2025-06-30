import { User } from '../../core/entities/User';
import { CreateUser } from '../../core/usecases/CreateUser';
import { userRepository } from '../../infra/database/repositoryInstance';

describe('CreateUser (UseCase)', () => {
  beforeEach(() => {
    userRepository.users = [];
  });

  it('deve criar um novo usuário e armazenar no repositório', async () => {
    const createUser = new CreateUser(userRepository);

    const user = await createUser.execute({
      name: 'Dandara da Silva',
      login: 'dandara1995',
      email: 'dandara@example.com',
      password: '123456'
    });

    expect(user).toBeInstanceOf(User);
    expect(user.email).toBe('dandara@example.com');
    expect(userRepository.users).toHaveLength(1);
  });

  it('não deve permitir criar dois usuários com o mesmo e-mail', async () => {
    const createUser = new CreateUser(userRepository);

    await createUser.execute({
      name: 'Usuária Original',
      login: 'original123',
      email: 'teste@exemplo.com',
      password: 'abc123'
    });

    await expect(
      createUser.execute({
        name: 'Duplicada',
        login: 'duplicada456',
        email: 'teste@exemplo.com',
        password: 'xyz456'
      })
    ).rejects.toThrow('Usuário já existe com esse e-mail');
    expect(userRepository.users).toHaveLength(1);
  });
});