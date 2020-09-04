import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/Users';
import IUserRepository from '../repositories/IUserRespository';

interface IRequest {
  user_id: string;
}

@injectable()
class UpdateProfile {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

  ) {}

  public async execute({ user_id }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if(!user) {
      throw new AppError('User not found.')
    }

    return user
  }
}

export default UpdateProfile;
