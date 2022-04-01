import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from './../src/users/users.module';

describe('findAll', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  test('GET /users/1', (done) => {
    request(app.getHttpServer())
      .get('/users/1')
      .then((res) => {
        expect(res.status).toBe(200)
        expect(res.body.data.id).toBe(1)
        expect(res.body.data.name).toBe("sample1")
        expect(res.body.data.firstname).toBe("sample1_firstname")
        expect(res.body.data.lastname).toBe("sample1_lastname")
        expect(res.body.data.email).toBe("sample1@example.com")
        done()
      })
      .catch((err) => {
        done(err)
      })
  });

});
