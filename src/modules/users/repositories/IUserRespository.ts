import User from '../infra/typeorm/entities/Users';
import ICreateUserDTO from '../dtos/CreateUserDTO';
import IListProviderDTO from '../dtos/IListProviderDTO';

export default interface IUserRepository {
  findAllProviders({ except_user_id }: IListProviderDTO): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(appointment: User): Promise<User>;
}
