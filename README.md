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
[x] int test を controller.spec にする
  [x] findAll
  [x] findById
  [x] create
  [x] update
  [x] delete
[x] repository ラッパを作成してメモリバージョンを作成する
[x] linter
[x] formatter
[ ] memory
  [x] findAll
  [x] findById
  [x] create
  [ ] update
  [ ] delete
[ ] postgres
  [ ] findAll
  [ ] findById
  [ ] create
  [ ] update
  [ ] delete
[ ] unit test
  [ ] findAll
  [ ] findById
  [ ] create
  [ ] update
  [ ] delete
[ ] e2e test
  [x] findAll
  [x] findById
  [x] create
  [ ] update
  [ ] delete

