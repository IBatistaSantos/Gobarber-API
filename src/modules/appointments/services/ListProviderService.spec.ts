import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import ListProvider from './ListProviderService';

let fakeUserRepository: FakeUsersRepository;
let listProfile: ListProvider;

describe('ListProvider', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    listProfile = new ListProvider(fakeUserRepository);
  });

  it('should be able to show the profile', async () => {
    const user1 = await fakeUserRepository.create({
      name: 'Jonh Doe',
      email: 'israel@gmail.com',
      password: '123456',
    });

    const user2 = await fakeUserRepository.create({
      name: 'Jonh Trê',
      email: 'israel2@gmail.com',
      password: '123456',
    });

    const loggedUser = await fakeUserRepository.create({
      name: 'Jonh Trê',
      email: 'israel2@gmail.com',
      password: '123456',
    });

    const providers = await listProfile.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
