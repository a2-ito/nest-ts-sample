import { User } from '../../interfaces/user.interface';

export abstract class IUserRepository {
  abstract findAll(): Promise<User[]>;
  abstract findById(id: string): Promise<User | null>;
  abstract createOne(user: User): Promise<void>;
  /*
  abstract updateOne(user: User): Promise<void>;
  abstract deleteOne(id: string): Promise<void>;
   */
}
