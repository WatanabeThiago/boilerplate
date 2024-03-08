import User from '../infra/data/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUsersRepository {
  findByEmail(email: string, relations?: string[]): Promise<User | null>;
  findById(id: string, relations?: string[]): Promise<User | null>;
  create(data: ICreateUserDTO): User;
  save(data: User): Promise<void>;
  delete(id: string): Promise<void>;
}
