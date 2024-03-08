import 'reflect-metadata';
import { Exclude } from 'class-transformer';

import UserRole from './UserRole';
import RefreshToken from './RefreshToken';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import Person from './Person';
import CorporationStaff from '@modules/v1/corporations/infra/data/entities/CorporationStaff';

@Entity('users')
class User {
  @PrimaryColumn("varchar")
  id: string;

  @Column("varchar")
  email: string;

  @Exclude()
  @Column("varchar",)
  password: string;

  @CreateDateColumn({ default: 'now()' })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  // ?  Relations
  @Column("varchar", { name: 'person_id' })
  personId: string;

  @OneToOne(() => Person, (person) => person.user)
  @JoinColumn({ name: 'person_id' })
  person: Person

  @OneToOne(() => UserRole, (userRole) => userRole.user)
  userRoles: UserRole[];

  @OneToMany(() => CorporationStaff, (corporationStaff) => corporationStaff.user)
  corporationStaff: CorporationStaff[];

  refreshTokens: RefreshToken[];
}

export default User;
