import 'reflect-metadata';

import Role from './Role';
import User from './User';
import { Entity, PrimaryColumn, Column, JoinColumn, OneToOne, ManyToOne, } from 'typeorm';

@Entity('user_roles')
class UserRole {
  @PrimaryColumn("varchar")
  id: string;

  @Column("int", { name: 'role_id' })
  roleId: number;

  @Column("varchar", { name: 'user_id' })
  userId: string;

  // * Relations
  @ManyToOne(() => Role, (role) => role.userRoles, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'roleId'
  })
  role: Role;

  // * Relations
  @OneToOne(() => User, (user) => user.userRoles, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'userId'
  })
  user: User;
}

export default UserRole;
