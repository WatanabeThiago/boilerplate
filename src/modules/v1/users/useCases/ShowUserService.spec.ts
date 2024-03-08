import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowUserService from './ShowUserService';
import { fakeUserId } from '../repositories/fakes/seeds';
import User from '../infra/data/entities/User';

let fakeUsersRepository: FakeUsersRepository;

let showUserService: ShowUserService;
describe('ShowUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showUserService = new ShowUserService(fakeUsersRepository);
  });

  it('1. Should be able to find user.', async () => {
    // ? Arrange

    // ? Act
    const user = await showUserService.execute({
      userId: fakeUserId
    });

    // ? Assert
    expect(user).toBeInstanceOf(User);
  });

  it('2. Should not be able to find non-existent user.', async () => {
    // ? Arrange

    // ? Act

    // ? Assert
    expect(showUserService.execute({
      userId: 'invalid'
    })).rejects.toMatchObject({
      errorName: "user_not_found",
      message: "Usuário não encontrado.",
      statusCode: 404,
    })
  });
});
