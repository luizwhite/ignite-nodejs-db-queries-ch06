import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }
  findAllUsersOrderedByFirstName(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
  findUserByFullName(data: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    throw new Error('Method not implemented.');
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User | null> {
    const userFound = await this.repository.findOne({ id: user_id });

    return userFound || null;
  }

  // async findAllUsersOrderedByFirstName(): Promise<User[]> {
  //   return this.repository.query(); // Complete usando raw query
  // }

  // async findUserByFullName({
  //   first_name,
  //   last_name,
  // }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
  //   return this.repository.query(); // Complete usando raw query
  // }
}
