import { User } from "../../core/entities/User";
import { DeleteUser } from "../../core/usecases/DeleteUser";
import { userRepository } from "../../infra/database/repositoryInstance";

describe('DeleteUser (UseCase)', () => {
  beforeEach(() => {
    userRepository.users = [];
  });


  it('deve deletar um usuário existente com sucesso', async () => {
    // Cria usuário inicial
    const user = new User(
      '1',
      'Maria',
      'maria123',
      'maria@example.com',
      'password123'
    );
    await userRepository.save(user);


    const deleteUser = new DeleteUser(userRepository);
    await deleteUser.execute(user.id);


    const deletedUser = await userRepository.findById(user.id);
    expect(deletedUser).toBeNull();
  });
});
