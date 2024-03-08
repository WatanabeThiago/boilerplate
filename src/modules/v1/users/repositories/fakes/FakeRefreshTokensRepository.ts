import { v4 } from 'uuid';

import IRefreshTokensRepository from '@modules/v1/users/repositories/IRefreshTokensRepository';
import ICreateRefreshTokenDTO from '@modules/v1/users/dtos/ICreateRefreshTokenDTO';

import RefreshToken from '../../infra/data/entities/RefreshToken';

class FakeRefreshTokensRepository implements IRefreshTokensRepository {
  private refreshToken: RefreshToken[] = [];

  public async findByUserId(id: string): Promise<RefreshToken | undefined> {
    const refeshToken = this.refreshToken.find(
      findRefreshToken => findRefreshToken.userId === id,
    );

    return refeshToken;
  }

  public async findByRefreshToken(
    token: string,
  ): Promise<RefreshToken | undefined> {
    const refreshToken = this.refreshToken.find(
      findRefreshToken => findRefreshToken.refreshToken === token,
    );

    return refreshToken;
  }

  public async findByAccessToken(
    token: string,
  ): Promise<RefreshToken | undefined> {
    const refreshToken = this.refreshToken.find(
      findRefreshToken => findRefreshToken.accessToken === token,
    );

    return refreshToken;
  }

  public async create({
    accessToken,
    expiresIn,
    isActive,
    refreshToken,
    userId,
  }: ICreateRefreshTokenDTO): Promise<RefreshToken> {
    const user = new RefreshToken();

    Object.assign(user, {
      id: v4(),
      accessToken,
      expiresIn,
      isActive,
      refreshToken,
      userId,
      created_at: Date.now(),
    });

    this.refreshToken.push(user);

    return user;
  }

  public async save(data: RefreshToken): Promise<RefreshToken> {
    this.refreshToken.push(data);

    return data;
  }
}

export default FakeRefreshTokensRepository;
