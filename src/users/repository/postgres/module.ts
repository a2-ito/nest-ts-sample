import { DynamicModule, Module } from '@nestjs/common';
//import { RepositoryModule } from './repository/repository.module';
//import { UserRepository } from './repository/memory/user.repository';
import { UserEntity } from '../../entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
//import { repositoryProviders } from './repository-providers';
import { dbConfig } from '../../../db.config';
import repositoryProviders from './repository-providers';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    TypeOrmModule.forFeature([UserEntity])
  ],
  providers: [...repositoryProviders],
  exports: [TypeOrmModule, ...repositoryProviders],
})
export class PostgresRepositoryModule {}
