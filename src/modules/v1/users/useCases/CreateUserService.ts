/* eslint-disable no-restricted-syntax */
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import crypto from 'crypto';
import authConfig from '@config/auth';
import refreshTokenConfig from '@config/refreshToken';
import { sign } from 'jsonwebtoken';
import IIdGeneratorProvider from '@shared/container/providers/IdGeneratorProvider/models/IIdGeneratorProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/data/entities/User';
import IRefreshTokensRepository from '../repositories/IRefreshTokensRepository';
import IPersonsRepository from '../repositories/IPersonsRepository';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';

export type CreateUserServiceReq = {
  personData: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
  }
  email: string;
  password: string;
};

interface IResponse {
  user: User;
  access_token: string;
  refresh_token: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('IdGeneratorProvider')
    private idGeneratorProvider: IIdGeneratorProvider,

    @inject('RefreshTokensRepository')
    private refreshTokensRepository: IRefreshTokensRepository,

    @inject('PersonsRepository')
    private personsRepository: IPersonsRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { }

  public async execute({
    personData,
    email,
    password,
  }: CreateUserServiceReq): Promise<IResponse> {
    if (email) {
      const emailAreadyUsed = await this.usersRepository.findByEmail(email);
      if (emailAreadyUsed) {
        throw new AppError('Email já registrado.', 409, 'email_already_used');
      }
    }

    const person = this.personsRepository.create({
      id: this.idGeneratorProvider.generate(),
      firstName: personData.firstName,
      lastName: personData.lastName,
      phoneNumber: personData.phoneNumber,
    })

    const phoneAlreadyUsed = await this.personsRepository.findByPhone(person.phoneNumber);
    if (phoneAlreadyUsed) {
      throw new AppError('Telefone já registrado.', 409, 'phone_already_used');
    }

    const user = this.usersRepository.create({
      id: crypto.randomUUID(),
      email,
      password: await this.hashProvider.generateHash(password),
      personId: person.id
    });
    await this.personsRepository.save(person)
    await this.usersRepository.save(user);

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign(
      {
        roles: user.userRoles,
        deleted_at: user.deletedAt,
        data: {
          id: user.id,
          name: person.firstName,
        },
      },
      secret,
      {
        subject: user.id,
        expiresIn,
      },
    );

    const refreshToken = await this.refreshTokensRepository.create({
      id: this.idGeneratorProvider.generate(),
      accessToken: token,
      expiresIn: refreshTokenConfig.refreshToken.expiresIn,
      isActive: true,
      refreshToken: crypto.randomBytes(32).toString('hex'),
      userId: user.id,
    });

    return {
      user: {
        ...user,
        person
      },
      access_token: token,
      refresh_token: refreshToken.refreshToken,
    };
  }
}

export default CreateUserService;
