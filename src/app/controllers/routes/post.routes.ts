import { Router } from "express";
import { CreatePostController } from "../CreatePostController";

const router = Router();
const createPostController = new CreatePostController();

router.post("/", async (req, res) => {
  await createPostController.handle(req, res);
});

export {router as postRoutes};
