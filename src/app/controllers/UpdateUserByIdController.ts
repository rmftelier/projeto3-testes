import { Request, Response } from 'express';
import { userRepository } from '../../infra/database/repositoryInstance';
import { UpdateUser } from '../../core/usecases/UpdateUser';

export class UpdateUserByController{
      async handle(req: Request, res: Response): Promise<void> {
        const { id } = req.params
        const { name, login, email, password } = req.body;
    
        try {
          const updateUser = await userRepository.update({id, name, login, email, password})
    
           res.json(updateUser);
        } catch (error: any) {
           res.status(404).json({ error: error.message });
        }
      }
}