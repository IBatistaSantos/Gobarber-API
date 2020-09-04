import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/Users';
import IUserRepository from '@modules/users/repositories/IUserRespository';

interface IRequest {
  user_id: string;
}

@injectable()
class ListProvider {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

  ) {}

  public async execute({ user_id }: IRequest): Promise<User[]> {
    const users = await this.userRepository.findAllProviders({
      except_user_id: user_id
    });
    return users
  }
}

export default ListProvider;
