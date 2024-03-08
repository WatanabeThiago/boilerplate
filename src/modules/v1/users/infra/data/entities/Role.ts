import 'reflect-metadata';
import UserRole from './UserRole';
import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';

@Entity('roles')
class Role {
  @PrimaryColumn("int")
  id: number;

  @Column("varchar")
  name: string;

  @OneToMany(() => UserRole, (userRole) => userRole.role)
  userRoles: UserRole[];
}

export default Role;
