import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from './../../src/users/entities/user.entity';
import { CreateUserDto } from './../../src/users/dto/create-user.dto';
import { UpdateUserDto } from './../../src/users/dto/update-user.dto';

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

  describe('#findAll', () => {
    it('should return 2 tasks', async () => {                                                               const sut = app.get<UsersController>(UsersController);
      const actual = await sut.findAll();
      console.log(actual);
      if ('data' in actual) {
        expect(actual.data[0].id).toBe('6a414c88-4613-486d-9990-80c1de52eea4');
        expect(actual.data[0].name).toBe('sample1');
        expect(actual.data[0].firstname).toBe('sample1_firstname');
        expect(actual.data[0].lastname).toBe('sample1_lastname');
        expect(actual.data[0].email).toBe('hoge@gmail.com');
      }
      console.log(actual.responsedAt);
      expect(actual.code).toBe('0000');
    });
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

  describe('#create', () => {
    it('create user', async () => {
      const sut = app.get<UsersController>(UsersController);
      const newuser =
      {
        name: 'name2',
        firstname: 'firstname2',
        lastname: 'lastname2',
        email: 'hoge2@gmail.com',
      } as CreateUserDto;
      const actual = await sut.create(newuser);
      expect(actual.code).toBe('0000');
    });

    it('should be 2 users', async () => {
      const sut = app.get<UsersController>(UsersController);
      const actual = await sut.findAll();
      if ('data' in actual) {
        expect(actual.data[0].id).toBe('6a414c88-4613-486d-9990-80c1de52eea4');
        expect(actual.data[0].name).toBe('sample1');
        expect(actual.data[0].firstname).toBe('sample1_firstname');
        expect(actual.data[0].lastname).toBe('sample1_lastname');
        expect(actual.data[0].email).toBe('hoge@gmail.com');
        expect(actual.data[1].name).toBe('name2');
        expect(actual.data[1].firstname).toBe('firstname2');
        expect(actual.data[1].lastname).toBe('lastname2');
        expect(actual.data[1].email).toBe('hoge2@gmail.com');
      }
      expect(actual.code).toBe('0000');
    });
  });

  describe('#update', () => {
    it('should return a user updated', async () => {
      const sut = app.get<UsersController>(UsersController);
      const newuser =
      {
        id: '6a414c88-4613-486d-9990-80c1de52eea4',
        name: 'name1',
        firstname: 'firstname1',
        lastname: 'lastname1',
        email: 'hoge1@gmail.com',
      } as UpdateUserDto;
      const actual = await sut.update(newuser.id, newuser);
      expect(actual.code).toBe('0000');
    });

    it('should be a updated user', async () => {
      const sut = app.get<UsersController>(UsersController);
      const actual = await sut.findAll();
      if ('data' in actual) {
        expect(actual.data[0].id).toBe('6a414c88-4613-486d-9990-80c1de52eea4');
        expect(actual.data[0].name).toBe('sample1');
        expect(actual.data[0].firstname).toBe('sample1_firstname');
        expect(actual.data[0].lastname).toBe('sample1_lastname');
        expect(actual.data[0].email).toBe('hoge@gmail.com');
      }
      expect(actual.code).toBe('0000');
    });
  });

  describe('#delete', () => {
    it('should return the number of users is 0', async () => {
      const sut = app.get<UsersController>(UsersController);
      const targetid = '6a414c88-4613-486d-9990-80c1de52eea4';
      let actual = await sut.findAll();
      let beforeSize = 0;
      let afterSize = 0;
      if ('data' in actual) {
        beforeSize = actual.data.length;
      }
      await sut.remove(targetid);
      actual = await sut.findAll();
      if ('data' in actual) {
        afterSize = actual.data.length;
      }
      expect(beforeSize).toBe(afterSize + 1);
    });
  });

});
