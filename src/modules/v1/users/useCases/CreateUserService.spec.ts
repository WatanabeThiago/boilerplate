import FakeIdGeneratorProvider from '@shared/container/providers/IdGeneratorProvider/fakes/FakeIdGeneratorProvider';
import IIdGeneratorProvider from '@shared/container/providers/IdGeneratorProvider/models/IIdGeneratorProvider';
import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakePersonsRepository from '../repositories/fakes/FakePersonsRepository';
import IPersonsRepository from '../repositories/IPersonsRepository';
import IRefreshTokensRepository from '../repositories/IRefreshTokensRepository';
import FakeRefreshTokensRepository from '../repositories/fakes/FakeRefreshTokensRepository';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import BCryptHashProvider from '@shared/container/providers/HashProvider/implementations/BCryptHashProvider';

let fakeUsersRepository: FakeUsersRepository;

let createUserService: CreateUserService;
let fakePersonsRepository: IPersonsRepository;
let refreshTokensRepository: IRefreshTokensRepository;
let fakeIdGeneratorProvider: IIdGeneratorProvider;
let hashProvider: IHashProvider;
describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakePersonsRepository = new FakePersonsRepository();
    refreshTokensRepository = new FakeRefreshTokensRepository();
    fakeIdGeneratorProvider = new FakeIdGeneratorProvider();
    fakeIdGeneratorProvider = new FakeIdGeneratorProvider();
    hashProvider = new BCryptHashProvider();

    createUserService = new CreateUserService(fakeUsersRepository, fakeIdGeneratorProvider, refreshTokensRepository, fakePersonsRepository, hashProvider);
  });

  it('1. Should be able to create a new user without: person info, email and password be encrypted.', async () => {
    // ? Arrange
    const firstName = 'Thiago'
    const lastName = 'Watanabe'
    const phoneNumber = '+55675985791513'

    const email = 'watanabe.thiago4@gmail.com'
    const password = '12345678'
    // ? Act
    const { user } = await createUserService.execute({
      personData: {
        firstName,
        lastName,
        phoneNumber,
      },
      email,
      password
    });

    // ? Assert
    expect(user.person.firstName).toBe(firstName);
    expect(user.person.lastName).toBe(lastName);
    expect(user.person.phoneNumber).toBe(phoneNumber);

    expect(user).toHaveProperty('id');
    expect(user.email).toBe(email);
    expect(await hashProvider.compareHash(password, user.password)).toBe(true);
  });

  it('2. Should throw error when duplicated emails.', async () => {
    // ? Arrange
    const firstName = 'Thiago'
    const lastName = 'Watanabe'
    const phoneNumber = '+55675985791513'

    const email = 'watanabe.thiago4@gmail.com'
    const password = '12345678'
    // ? Act
    await createUserService.execute({
      personData: {
        firstName,
        lastName,
        phoneNumber,
      },
      email,
      password
    });

    await expect(createUserService.execute({
      personData: {
        firstName,
        lastName,
        phoneNumber: "random",
      },
      email,
      password
    })).rejects.toBeInstanceOf(AppError)
  });

  it('3. Should throw error when duplicated phones.', async () => {
    // ? Arrange
    const firstName = 'Thiago'
    const lastName = 'Watanabe'
    const phoneNumber = '+55675985791513'

    const email = 'watanabe.thiago4@gmail.com'
    const password = '12345678'
    // ? Act
    await createUserService.execute({
      personData: {
        firstName,
        lastName,
        phoneNumber,
      },
      email,
      password
    });

    await expect(createUserService.execute({
      personData: {
        firstName,
        lastName,
        phoneNumber,
      },
      email: 'random@gmail.com',
      password
    })).rejects.toBeInstanceOf(AppError)
  });
});
