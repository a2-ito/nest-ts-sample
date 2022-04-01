import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './../../src/users/users.controller';
import { UsersService } from './../../src/users/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from './../../src/users/entities/user.entity';

describe('UsersController', () => {
  let app: TestingModule;

  beforeAll(async () => {

    const users = [
      {
        id: '6a414c88-4613-486d-9990-80c1de52eea4',
        name: 'name',
        firstname: 'firstname',
        lastname: 'lastname',
        email: 'hoge@gmail.com',
      },
    ];

    const MockRepository = {
      provide: getRepositoryToken(UserEntity),
      useValue: {
        find: () => users,
        insert: entity => users.push(entity),
        update: (id, entity) => entity,
        delete: () => users.splice(0, 1),
      },
    };

    app = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, MockRepository],
    }).compile();
  });

  describe('#findAll', () => {
    it('should return 2 tasks', async () => {
      const sut = app.get<UsersController>(UsersController);
      const actual = await sut.findAll();
      console.log(actual);
      if ('data' in actual) {
        expect(actual.data[0].id).toBe('6a414c88-4613-486d-9990-80c1de52eea4');
        expect(actual.data[0].name).toBe('name');
        expect(actual.data[0].firstname).toBe('firstname');
        expect(actual.data[0].lastname).toBe('lastname');
        expect(actual.data[0].email).toBe('hoge@gmail.com');
      }
      console.log(actual.responsedAt);
      expect(actual.code).toBe('0000');
    });
  });
});
