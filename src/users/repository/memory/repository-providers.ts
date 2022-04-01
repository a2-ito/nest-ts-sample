import { IUserRepository } from '../interface/i-user.repository';
import { UserInMemoryRepository } from './user.repository';

export default [
  // Repository
  {
    provide: IUserRepository,
    useClass: UserInMemoryRepository,
  },
];
