import IUsersRepository from '../IUsersRepository';
import ICreateUserDTO from '../../dtos/ICreateUserDTO';

import User from '../../infra/data/entities/User';
import { fakeJonhDoe, fakeUser } from './seeds';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [fakeUser, fakeJonhDoe];

  insert(data: User): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find(item => item.email === email);

    return user || null;
  }

  public async index(): Promise<User[]> {
    return this.users;
  }


  public async findById(id: string): Promise<User | null> {
    const user = this.users.find(item => item.id === id);

    return user || null;
  }

  public create(data: ICreateUserDTO): User {
    const user = new User();
    Object.assign(user, data);

    return user || null;
  }

  public async save(user: User): Promise<void> {
    this.users.push(user);
  }

  public async delete(id: string): Promise<void> {
    const userIndex = this.users.findIndex(item => item.id === id);

    this.users.splice(userIndex, 1);
  }
}

export default FakeUsersRepository;
