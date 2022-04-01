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
        name: 'sample1',
        firstname: 'sample1_firstname',
        lastname: 'sample1_lastname',
        email: 'hoge@gmail.com',
      },
    ];

    const MockRepository = {
      provide: getRepositoryToken(UserEntity),
      useValue: {
        find: () => users,
        findOne: (id) => users[0],
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

  describe('#findById', () => {
    it('should be user1', async () => {
      const sut = app.get<UsersController>(UsersController);
      const actual = await sut.findById('6a414c88-4613-486d-9990-80c1de52eea4');
      console.log(actual);
      expect(actual.code).toBe('0000');
      if ('data' in actual) {
        expect(actual.data.id).toBe('6a414c88-4613-486d-9990-80c1de52eea4');
        expect(actual.data.name).toBe('sample1');
        expect(actual.data.firstname).toBe('sample1_firstname');
        expect(actual.data.lastname).toBe('sample1_lastname');
        expect(actual.data.email).toBe('hoge@gmail.com');
      }
    });
  });
});
