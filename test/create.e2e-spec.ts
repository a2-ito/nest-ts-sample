import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from './../src/users/users.module';

describe('create', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  test('POST /users', (done) => {
    request(app.getHttpServer())
      .post('/users')
      .set('Content-Type', 'application/json')
      .send('{"name": "hogehoge", "firstname": "hogehoge_firstname", "lastname": "hogehoge_lastname", "email": "hogehoge@example.com"}')
      .then((res) => {
        expect(res.status).toBe(201)
        done()
      })
      .catch((err) => {
        done(err)
      })
  });

  test('GET /users/3', (done) => {
    request(app.getHttpServer())
      .get('/users/3')
      .then((res) => {
        expect(res.status).toBe(200)
        expect(res.body.data.id).toBe(3)
        expect(res.body.data.name).toBe("hogehoge")
        expect(res.body.data.firstname).toBe("hogehoge_firstname")
        expect(res.body.data.lastname).toBe("hogehoge_lastname")
        expect(res.body.data.email).toBe("hogehoge@example.com")
        done()
      })
      .catch((err) => {
        done(err)
      })
  });

  test('DELETE /users/3', (done) => {
    request(app.getHttpServer())
      .delete('/users/3')
      .then((res) => {
        expect(res.status).toBe(200)
        done()
      })
      .catch((err) => {
        done(err)
      })
  });

  test('GET /users/3', (done) => {
    request(app.getHttpServer())
      .get('/users/3')
      .then((res) => {
        expect(res.status).toBe(200)
        expect(res.body.code).toBe("5000")
        expect(res.body.message).toBe("data is null")
        done()
      })
      .catch((err) => {
        done(err)
      })
  });

});
