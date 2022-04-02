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
import { RepositoryModule } from './../../src/users/repository/module';
import { Client } from 'pg';


describe('test e2e', () => {
  let app: INestApplication;
  let client;
  let newid;

  beforeAll(async () => {
    if ( process.env.REPOSITORY_TYPE == 'postgres') {
	    client = new Client({
        host: 'localhost',
		    database: 'e2etest',
		    user: 'testuser',
        port: 5432,
		    password: 'p',
	    });
	    await client.connect();
      await client.query('TRUNCATE users');
      await client.query("insert into users (id, name, firstname, lastname, email) values ('6a414c88-4613-486d-9990-80c1de52eea4', 'sample1', 'sample1_firstname', 'sample1_lastname', 'sample1@example.com')");
      await client.query("insert into users (id, name, firstname, lastname, email) values ('d053fabc-1b69-432b-8f9d-5b63d4885bcc', 'sample2', 'sample2_firstname', 'sample2_lastname', 'sample2@example.com')");
      await client.query("insert into users (id, name, firstname, lastname, email) values ('7f7a1e81-3875-48dd-ba40-9054ab68a1d2', 'sample3', 'sample3_firstname', 'sample3_lastname', 'sample3@example.com')");
      await client.query('commit');
    }

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        RepositoryModule.register(process.env.REPOSITORY_TYPE),
      ],
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    if ( process.env.REPOSITORY_TYPE == 'postgres') {
      await client.query("TRUNCATE users");
      await client.end();
    }
  });

  test('#findById', (done) => {
    request(app.getHttpServer())
      .get('/users/6a414c88-4613-486d-9990-80c1de52eea4')
      .then((res) => {
        expect(res.status).toBe(200)
        expect(res.body.code).toBe('0000')
        expect(res.body.data.id).toBe('6a414c88-4613-486d-9990-80c1de52eea4')
        expect(res.body.data.name).toBe('sample1')
        expect(res.body.data.firstname).toBe('sample1_firstname')
        expect(res.body.data.lastname).toBe('sample1_lastname')
        expect(res.body.data.email).toBe('sample1@example.com')
        done()
      })
      .catch((err) => {
        done(err)
      })
  });

  test('#create: POST /users', (done) => {
    request(app.getHttpServer())
      .post('/users')
      .set('Content-Type', 'application/json')
      .send('{"name": "created_user", "firstname": "hogehoge", "lastname": "hogehoge", "email": "sample3@example.com"}')
      .then((res) => {
        expect(res.status).toBe(201)
        newid = res.body.data.id;
        done()
      })
      .catch((err) => {
        done(err)
      })
  });

  test('#findById created_user', (done) => {
    request(app.getHttpServer())
    .get('/users/'+newid)
      .then((res) => {
        expect(res.status).toBe(200)
        expect(res.body.code).toBe('0000')
        expect(res.body.data.name).toBe('created_user')
        expect(res.body.data.firstname).toBe('hogehoge')
        expect(res.body.data.lastname).toBe('hogehoge')
        expect(res.body.data.email).toBe('sample3@example.com')
        done()
      })
      .catch((err) => {
        done(err)
      })
  });

  test('#update: PATCH /users', (done) => {
    request(app.getHttpServer())
      .patch('/users/d053fabc-1b69-432b-8f9d-5b63d4885bcc')
      .set('Content-Type', 'application/json')
      .send('{"name": "updated_user", "firstname": "sample2_firstname", "lastname": "sample2_lastname", "email": "updated@example.com"}')
      .then((res) => {
        expect(res.status).toBe(200)
        done()
      })
      .catch((err) => {
        done(err)
      })
  });

  test('#delete: PATCH /users', (done) => {
    request(app.getHttpServer())
      .delete('/users/7f7a1e81-3875-48dd-ba40-9054ab68a1d2')
      .then((res) => {
        expect(res.status).toBe(200)
        done()
      })
      .catch((err) => {
        done(err)
      })
  });

  test('#findAll: data length should be 3', (done) => {
    let afterSize = 0;
    request(app.getHttpServer())
      .get('/users')
      .then((res) => {
        expect(res.status).toBe(200)
        afterSize = res.body.data.length;
        expect(afterSize).toBe(3);
        done()
      })
      .catch((err) => {
        done(err)
      })
  });

});
