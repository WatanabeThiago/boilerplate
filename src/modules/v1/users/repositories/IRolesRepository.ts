import Role from '../infra/data/entities/Role';

export default interface IRolesRepository {
  findById(id: number): Promise<Role | null>;
}
