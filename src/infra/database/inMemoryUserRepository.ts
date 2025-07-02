import { User } from '../../core/entities/User';
import { UserRepository } from '../../core/repositories/UserRepository';

export class InMemoryUserRepository implements UserRepository {
  public users: User[] = [];

  async save(user: User): Promise<void> {
    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((u) => u.email === email);
    return user || null; 
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find((u) => u.id === id);
    return user || null;
  }

  async update(user: User): Promise<void> {
    const index = this.users.findIndex((u) => u.id === user.id)
      if(index !== -1){
        this.users[index] = user
      }

  }

  async delete(id: string): Promise<void> {
    this.users = this.users.filter((user) => user.id !== id);
    
    // const index = this.users.findIndex((user) => user.id === id);
    // if (index !== -1) {
    //   this.users.splice(index, 1);
    // }
    
  }
}