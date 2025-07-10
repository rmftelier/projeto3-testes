import { Request, Response } from "express";
import { CreatePost } from "../../core/usecases/CreatePost";
import { MongoPostRepository } from "../../infra/database/MongoPostRepository";
import { Post } from "../../core/entities/Post";

export class CreatePostController {
  async handle(req: Request, res: Response) {
    const { title, content, userId } = req.body;

    const post = new Post(title, content, userId);

    const postRepo = new MongoPostRepository();
    const createPost = new CreatePost(postRepo);

    try {
      await createPost.execute(post);
      return res.status(201).json({ message: "Post criado com sucesso!" });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}