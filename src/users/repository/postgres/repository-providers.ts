import { IUserRepository } from '../interface/i-user.repository';
import { UserTypeormRepository } from './user.repository';

export default [
  // Repository
  {
    provide: IUserRepository,
    useClass: UserTypeormRepository,
  },
];
