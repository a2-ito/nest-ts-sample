import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from './users/entities/user.entity';

export const dbConfig: TypeOrmModuleOptions = {
  //type: process.env.DB_TYPE,
  type: 'postgres',
  host: 'localhost',
  //port: process.env.PSQL_DB_PORT,
  port: 5432,
  username: 'testuser',
  password: 'p',
  database: 'sample',
  entities: [UserEntity],
  synchronize: false,
};
