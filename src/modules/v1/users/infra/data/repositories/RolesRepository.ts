import AppDataSource from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import IRolesRepository from '../../../repositories/IRolesRepository';

import Role from '../entities/Role';

class RolesRepository implements IRolesRepository {
  private ormRepository: Repository<Role>

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Role);
  }

  public async findById(id: number): Promise<Role | null> {
    return this.ormRepository.findOne({
      where: { id },
    });
  }
}

export default RolesRepository;
