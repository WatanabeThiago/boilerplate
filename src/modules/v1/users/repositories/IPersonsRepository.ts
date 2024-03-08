import Person from '../infra/data/entities/Person';
import ICreatePersonDTO from '../dtos/ICreatePersonDTO';

export default interface IPersonsRepository {
  create(data: ICreatePersonDTO): Person;
  save(data: Person): Promise<void>;
  findByPhone(phone: string): Promise<Person | undefined>;
}
