import IFindUserDTO from '@modules/v1/users/dtos/IFindUserDTO';
import IUsersRepository from '../../../repositories/IUsersRepository';
import ICreateProductDTO from '../../../dtos/ICreateUserDTO';

import User from '../entities/User';
import AppDataSource from '@shared/infra/typeorm';
import { Repository } from 'typeorm';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>

  constructor() {
    this.ormRepository = AppDataSource.getRepository(User);
  }


  async findByEmail(email: string, relations?: string[]): Promise<User | null> {
    return this.ormRepository.findOne({
      where: {
        email
      },
      relations: {
        person: true,
        corporationStaff: {
          corporation: true
        }
      }
    })
  }

  public async findById(id: string, relations?: string[]): Promise<User | null> {
    return this.ormRepository.findOne({
      where: {
        id,
      },
      relations
    })
  }

  public async findBy({ email, phone }: IFindUserDTO): Promise<User | null> {
    return this.ormRepository.findOne({
      where: { email },
    })
  }

  public create(user: ICreateProductDTO): User {
    return this.ormRepository.create({ ...user, createdAt: new Date(), updatedAt: new Date() })
  }

  public async save(data: User): Promise<void> {
    console.log(data)
    await this.ormRepository.save(data)
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id)
  }
}

export default UsersRepository;
