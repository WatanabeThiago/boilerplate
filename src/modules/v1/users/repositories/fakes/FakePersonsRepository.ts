
import IPersonsRepository from '../IPersonsRepository';
import ICreatePersonDTO from '../../dtos/ICreatePersonDTO';

import Person from '../../infra/data/entities/Person';

class FakePersonsRepository implements IPersonsRepository {
  private persons: Person[] = [];
  public create(data: ICreatePersonDTO): Person {
    const user = new Person();
    Object.assign(user, data);

    return user || null;
  }

  public async save(user: Person): Promise<void> {
    this.persons.push(user);
  }

  async findByPhone(phone: string): Promise<Person | null> {
    return this.persons.find(person => person.phoneNumber === phone) || null
  }
}

export default FakePersonsRepository;
