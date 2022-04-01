import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './../../src/users/users.controller';
import { UsersService } from './../../src/users/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from './../../src/users/entities/user.entity';
import { CreateUserDto } from './../../src/users/dto/create-user.dto';

describe('create user', () => {
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
      if ('data' in actual) {
        expect(actual.data[0].id).toBe('6a414c88-4613-486d-9990-80c1de52eea4');
        expect(actual.data[0].name).toBe('name');
        expect(actual.data[0].firstname).toBe('firstname');
        expect(actual.data[0].lastname).toBe('lastname');
        expect(actual.data[0].email).toBe('hoge@gmail.com');
      }
      expect(actual.code).toBe('0000');
    });
  });

  describe('#create', () => {
    it('should return 2 tasks', async () => {
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
  });

  describe('#findAll', () => {
    it('should return 2 tasks', async () => {
      const sut = app.get<UsersController>(UsersController);
      const actual = await sut.findAll();
      if ('data' in actual) {
        expect(actual.data[0].id).toBe('6a414c88-4613-486d-9990-80c1de52eea4');
        expect(actual.data[0].name).toBe('name');
        expect(actual.data[0].firstname).toBe('firstname');
        expect(actual.data[0].lastname).toBe('lastname');
        expect(actual.data[0].email).toBe('hoge@gmail.com');
        expect(actual.data[1].name).toBe('name2');
        expect(actual.data[1].firstname).toBe('firstname2');
        expect(actual.data[1].lastname).toBe('lastname2');
        expect(actual.data[1].email).toBe('hoge2@gmail.com');
      }
      expect(actual.code).toBe('0000');
    });
  });

});
