import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfile from './UpdateProfileService';

let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfile;
describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfile(fakeUserRepository, fakeHashProvider);
  });

  it('should be able to update the profie', async () => {
    const user = await fakeUserRepository.create({
      name: 'Jonh Doe',
      email: 'israel@gmail.com',
      password: '123456',
    });

    const updateUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Jonh Trê',
      email: 'jonhtre@gmail.com',
    });
    expect(updateUser.name).toBe('Jonh Trê');
    expect(updateUser.email).toBe('jonhtre@gmail.com');
  });

  it('should not be able to change to another user email', async () => {
    await fakeUserRepository.create({
      name: 'Jonh Doe',
      email: 'israel@gmail.com',
      password: '123456',
    });

    const user = await fakeUserRepository.create({
      name: 'Test',
      email: 'test@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Jonh Trê',
        email: 'israel@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Jonh Doe',
      email: 'israel@gmail.com',
      password: '123456',
    });

    const updateUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Jonh Doe',
      email: 'jonhdoe@gmail.com',
      old_password: '123456',
      password: '1234567',
    });
    expect(updateUser.password).toBe('1234567');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Jonh Doe',
      email: 'israel@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Jonh Doe',
        email: 'jonhdoe@gmail.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Jonh Doe',
      email: 'israel@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Jonh Doe',
        email: 'jonhdoe@gmail.com',
        old_password: '12345',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
