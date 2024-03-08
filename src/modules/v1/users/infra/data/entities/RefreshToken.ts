import 'reflect-metadata'
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import User from './User';

@Entity('refresh_tokens')
class RefreshToken {
  @PrimaryColumn("varchar",)
  id: string;

  @Column("varchar",)
  accessToken: string;

  @Column("varchar",)
  refreshToken: string;

  @Column("varchar",)
  userId: string;

  @Column("int",)
  expiresIn: number;

  @Column("boolean",)
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.refreshTokens, { onDelete: 'CASCADE' })
  user: User;
}

export default RefreshToken;
