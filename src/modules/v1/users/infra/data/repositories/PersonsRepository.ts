import IFindUserDTO from '@modules/v1/users/dtos/IFindUserDTO';
import clearJson from '@shared/functions/clearJson';
import IPersonsRepository from '../../../repositories/IPersonsRepository';
import ICreateProductDTO from '../../../dtos/ICreateUserDTO';

import Person from '../entities/Person';
import AppDataSource from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import ICreatePersonDTO from '@modules/v1/users/dtos/ICreatePersonDTO';

class PersonsRepository implements IPersonsRepository {
  private ormRepository: Repository<Person>

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Person);
  }


  public async findById(id: string, relations?: string[]): Promise<Person | null> {
    return this.ormRepository.findOne({
      where: {
        id,
      },
      relations
    })
  }

  public async findByPhone(phone: string): Promise<Person | undefined> {
    return this.ormRepository.findOne({
      where: {
        phoneNumber: phone,
      }
    })
  }

  public async findBy({ email, phone }: IFindUserDTO): Promise<Person | null> {
    return this.ormRepository.findOne({
      where: clearJson({ email, phone }),
    })
  }

  public create(user: ICreatePersonDTO): Person {
    return this.ormRepository.create({ ...user, createdAt: new Date(), updatedAt: new Date() })
  }

  public async save(data: Person): Promise<void> {
    await this.ormRepository.save(data)
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id)
  }
}

export default PersonsRepository;
