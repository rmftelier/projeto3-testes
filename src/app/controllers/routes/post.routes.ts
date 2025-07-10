import { Router } from "express";
import { CreatePostController } from "../CreatePostController";
import { GetAllWithUserController } from "../GetAllWithUserController";

const router = Router();
const createPostController = new CreatePostController();
const getAllWithUserController = new GetAllWithUserController();

router.post("/", async (req, res) => {
  await createPostController.handle(req, res);
});

router.get('/posts', async (req, res) => {
    await getAllWithUserController.handle(req, res);
})

export {router as postRoutes};
