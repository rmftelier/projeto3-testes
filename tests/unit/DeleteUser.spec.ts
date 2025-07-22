import { User } from "../../src/core/entities/User";
import { DeleteUser } from "../../src/core/usecases/DeleteUser";
import { userRepository } from "../../src/infra/database/repositoryInstance";

describe('DeleteUser (UseCase)', () => {
  beforeEach(() => {
    userRepository.users = [];
  });


  it('deve deletar um usuário existente com sucesso', async () => {
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