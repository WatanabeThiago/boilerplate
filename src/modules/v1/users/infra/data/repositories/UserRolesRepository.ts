import ICreateUserRoleDTO from '@modules/v1/users/dtos/ICreateUserRoleDTO';
import IUserRolesRepository from '../../../repositories/IUserRolesRepository';

import UserRole from '../entities/UserRole';
import AppDataSource from '@shared/infra/typeorm';
import { Repository } from 'typeorm';

class UserRolesRepository implements IUserRolesRepository {
  private ormRepository: Repository<UserRole>

  constructor() {
    this.ormRepository = AppDataSource.getRepository(UserRole);
  }
  public create(user: ICreateUserRoleDTO): UserRole {
    return this.ormRepository.create(user)
  }

  public async save(data: UserRole): Promise<void> {
    await this.ormRepository.save(data);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default UserRolesRepository;
