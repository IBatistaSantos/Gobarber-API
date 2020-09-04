import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';
import FakeStorageProvider from '../../../shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import UpdateUserAvatar from './UpdateUserAvatarService';


let fakeUserRepository: FakeUsersRepository;
let fakeStorageProvide: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatar;
describe('UpdateUserAvatar', () => {
  beforeEach(() => {
     fakeUserRepository = new FakeUsersRepository();
     fakeStorageProvide = new FakeStorageProvider();

     updateUserAvatar = new UpdateUserAvatar(
      fakeUserRepository,
      fakeStorageProvide,
    );

  })

  it('should be able to update avatar user', async () => {

    const user = await fakeUserRepository.create({
      name: 'Jonh Doe',
      email: 'israel@gmail.com',
      password: '123456',
    });
    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.png',
    });

    expect(user.avatar).toBe('avatar.png');
  });

  it('should not be able to avatar from non existing user', async () => {
    await expect(
      updateUserAvatar.execute({
        user_id: 'non-existing',
        avatarFilename: 'avatar.png',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvide, 'deleteFile');

    const user = await fakeUserRepository.create({
      name: 'Jonh Doe',
      email: 'israel@gmail.com',
      password: '123456',
    });
    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.png',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar2.png',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.png');
    expect(user.avatar).toBe('avatar2.png');
  });
});
