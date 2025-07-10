import { PostRepository } from "../../core/repositories/PostRepository";
import { Post } from "../../core/entities/Post";
import { PostModel } from "../database/mogoosePostModel";
import { PostWithUserDTO } from "../../core/entities/PostWithUserDTO";

export class MongoPostRepository implements PostRepository {
  async save(post: Post): Promise<void> {
    await PostModel.create(post);
  }

  async getAllWithUser(): Promise<PostWithUserDTO[]> {
    return PostModel.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          _id: false,
          title: true,
          content: true,
          "user.name": true,
          "user.email": true,
        },
      },
    ]);
  }
}

/*
{
  "title": "Meu Post Legal",
  "userId": "123",
  "user": [ 
    {
      "_id": "123",
      "name": "João",
      "email": "joao@email.com"
    }
  ]
} 
  depois
{
  "title": "Meu Post Legal",
  "userId": "123",
  "user": { 
    "_id": "123",
    "name": "João",
    "email": "joao@email.com"
  }
}
*/
