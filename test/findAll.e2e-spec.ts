import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from './../../src/users/users.module';
import { UsersService } from './../../src/users/users.service';
import { UsersController } from './../../src/users/users.controller';
import { UserEntity } from './../../src/users/entities/user.entity';
import { AppModule } from './../../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './../../src/db.config';

describe('findAll', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forFeature([UserEntity]),
        AppModule,
      ],
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  test('GET /users', (done) => {
    request(app.getHttpServer())
      .get('/users')
      .then((res) => {
        console.log(res.body.data[0]);
        console.log(res.body.data[1]);
        expect(res.status).toBe(200)
        expect(res.body.code).toBe('0000')
        expect(res.body.data[0].id).toBe(1)
        expect(res.body.data[0].name).toBe('sample1')
        expect(res.body.data[0].firstname).toBe('sample1_firstname')
        expect(res.body.data[0].lastname).toBe('sample1_lastname')
        expect(res.body.data[0].email).toBe('sample1@example.com')
        expect(res.body.data[1].id).toBe(2)
        expect(res.body.data[1].name).toBe('sample2')
        expect(res.body.data[1].firstname).toBe('sample2_firstname')
        expect(res.body.data[1].lastname).toBe('sample2_lastname')
        expect(res.body.data[1].email).toBe('sample2@example.com')
        done()
      })
      .catch((err) => {
        done(err)
      })
  });

});
