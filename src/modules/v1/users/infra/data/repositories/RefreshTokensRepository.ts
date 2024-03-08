import IRefreshTokensRepository from '@modules/v1/users/repositories/IRefreshTokensRepository';

import ICreateRefreshTokenDTO from '@modules/v1/users/dtos/ICreateRefreshTokenDTO';
import RefreshToken from '../entities/RefreshToken';
import AppDataSource from '@shared/infra/typeorm';
import { Repository } from 'typeorm';

class RefreshTokensRepository implements IRefreshTokensRepository {
  private ormRepository: Repository<RefreshToken>

  constructor() {
    this.ormRepository = AppDataSource.getRepository(RefreshToken);
  }

  public async findByUserId(id: string): Promise<RefreshToken | undefined> {
    const token = await this.ormRepository.findOne({
      where: { userId: id },
    });
    return token ? Object.assign(new RefreshToken(), token) : undefined;
  }

  public async findByRefreshToken(
    token: string,
  ): Promise<RefreshToken | undefined> {
    const foundToken = await this.ormRepository.findOne({
      where: { refreshToken: token },
    });

    return foundToken
      ? Object.assign(new RefreshToken(), foundToken)
      : undefined;
  }

  public async findByAccessToken(
    token: string,
  ): Promise<RefreshToken | undefined> {
    const foundToken = await this.ormRepository.findOne({
      where: { accessToken: token },
    });

    return foundToken
      ? Object.assign(new RefreshToken(), foundToken)
      : undefined;
  }

  public async create({
    id,
    accessToken,
    expiresIn,
    isActive,
    refreshToken,
    userId,
  }: ICreateRefreshTokenDTO): Promise<RefreshToken> {
    const newToken = this.ormRepository.create({
      id,
      expiresIn,
      isActive,
      refreshToken,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return Object.assign(new RefreshToken(), newToken);
  }
}

export default RefreshTokensRepository;
