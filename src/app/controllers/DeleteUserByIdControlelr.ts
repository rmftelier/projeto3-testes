
import { DeleteUser } from "../../core/usecases/DeleteUser";
import { userRepository } from '../../infra/database/repositoryInstance';


export class DeleteUserByIdController {
  async handle(request: { userId: string }): Promise<void> {
    const { userId } = request;
    const deleteUser = new DeleteUser(userRepository);
    await deleteUser.execute(userId);
  }
}
