import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthicateUserService from './AuthticateUserService';
import CreateUserService from './CreateUserService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthicateUserService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    authenticateUser = new AuthicateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
  })
  it('should be able to authenticate', async () => {
    const user = await createUser.execute({
      name: 'Jonh Doe',
      email: 'israel@gmail.com',
      password: '123123',
    });

    const response = await authenticateUser.execute({
      email: 'israel@gmail.com',
      password: '123123',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'israelbatista@gmail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await createUser.execute({
      name: 'Jonh Doe',
      email: 'israel@gmail.com',
      password: '123123',
    });

    await expect(
      authenticateUser.execute({
        email: 'israel@gmail.com',
        password: '1231233',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
