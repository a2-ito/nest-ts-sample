# nest-ts-sample

This repository is a NestJS sample code with tests.

## usage
```
npm install
```

If you run just "make", the in-memory datastore version will be run.
```
make
```

You can run it with Postgres on docker, it requires to run Postgres firstly.
```
docker-compose up -d
```
```
make run-with-db
```

## Todo
- [x] int test を controller.spec にする
  - [x] findAll
  - [x] findById
  - [x] create
  - [x] update
  - [x] delete
- [x] repository ラッパを作成してメモリバージョンを作成する
- [x] linter
- [x] formatter
- [x] memory
  - [x] findAll
  - [x] findById
  - [x] create
  - [x] update
  - [x] delete
- [x] postgres
  - [x] findAll
  - [x] findById
  - [x] create
  - [x] update
  - [x] delete
- [ ] unit test
  - [ ] findAll
  - [ ] findById
  - [ ] create
  - [ ] update
  - [ ] delete
- [x] e2e test - user.e2e-spec.ts
- [ ] complete lint nad format
- [ ] run on docker container
- [ ] build with buildpacks
