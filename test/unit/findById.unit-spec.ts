import { UserInMemoryRepository } from "../../src/users/repository/memory/user.repository";
import { UsersService } from '../../src/users/users.service';
import { User } from '../../src/users/interfaces/user.interface';

const findByIdExpect = require('./findByIdExpect.json');

describe('unit - findById service', ()=> {
  const u = new UserInMemoryRepository;
  beforeAll(async ()=> {
    const users = [
      {
        id: '6a414c88-4613-486d-9990-80c1de52eea4',
        name: 'sample1',
        firstname: 'sample1_firstname',
        lastname: 'sample1_lastname',
        email: 'hoge@gmail.com',
      },
    ];
    //DB.users = users;
    const mockTextExec = jest.spyOn(u, 'findById').mockImplementation((param)=> {
      return Promise.resolve(users);
    });
  });

  /*
  test('', async ()=> {
    const findbyid = new FindById(u);
    await expect(findbyid.execute(1)).resolves.toEqual(findByIdExpect);
  });
   */
})
