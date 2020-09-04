import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';
import ShowProfile from './ShowProfileService';

let fakeUserRepository: FakeUsersRepository;
let showProfile: ShowProfile;

describe('ShowProfile', () => {
  beforeEach(() => {
     fakeUserRepository = new FakeUsersRepository();
     showProfile = new ShowProfile(
      fakeUserRepository,
    );

  })

  it('should be able to show the profile', async () => {

    const user = await fakeUserRepository.create({
      name: 'Jonh Doe',
      email: 'israel@gmail.com',
      password: '123456',
    });

    const showUserProfile = await showProfile.execute({
      user_id: user.id,
    })
    expect(showUserProfile.name).toBe('Jonh Doe');
    expect(showUserProfile.email).toBe('israel@gmail.com');

  });

  it('should not be able to show the profile from non-existing', async () => {
    await expect(
      showProfile.execute({
        user_id: 'non-existing',
      })
    ).rejects.toBeInstanceOf(AppError)
  });
});
