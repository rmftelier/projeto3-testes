import { Router } from 'express';
import { CreateUserController } from '../CreateUserController';
import { GetUserByIdController } from '../GetUserByIdController';

const router = Router(); 

const createUserController = new CreateUserController();
const getUserByIdController = new GetUserByIdController();


router.post('/', async (req, res) => {
  await createUserController.handle(req, res);
});

router.get('/:id', async (req, res) => {
  await getUserByIdController.handle(req, res);
});
export { router as userRoutes };
