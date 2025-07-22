import { User } from "../../src/core/entities/User";
import { UpdateUser } from "../../src/core/usecases/UpdateUser";
import { userRepository } from "../../src/infra/database/repositoryInstance";

describe("UpdateUser", () => {
    let user: User
  beforeEach(() => {
    userRepository.users = [];
    user = new User('1', 'Angela', 'AngelaCarvalho', 'angela@email.com',  '1234')
    userRepository.users.push(user)
  });

  it('deve atualizar um usuário existente com sucesso', async () => {
        const updateUser = new UpdateUser(userRepository)

        const update = await updateUser.execute(user.id, {name: 'Angela Carvalho'});

        expect(update.name).toBe('Angela Carvalho');
  })

});