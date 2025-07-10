import { PostRepository } from "../../core/repositories/PostRepository";
import { Post } from "../../core/entities/Post";
import { PostModel } from "../database/mogoosePostModel";

export class MongoPostRepository implements PostRepository {
  async save(post: Post): Promise<void> {
    await PostModel.create(post);
  }
}