import UserRole from '../infra/data/entities/UserRole';
import ICreateUserRoleDTO from '../dtos/ICreateUserRoleDTO';

export default interface IUserRolesRepository {
  create(data: ICreateUserRoleDTO): UserRole;
  save(data: UserRole): Promise<void>;
  delete(id: string): Promise<void>;
}
