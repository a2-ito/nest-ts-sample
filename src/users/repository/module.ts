import { DynamicModule, Module } from '@nestjs/common';
//import { RepositoryModule } from './repository/repository.module';
//import { UserRepository } from './repository/memory/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
//import { repositoryProviders } from './repository-providers';
import { PostgresRepositoryModule } from './postgres/module';
import { InMemoryRepositoryModule } from './memory/module';
import { Exception } from '../../exception';

type RepositoryType = typeof process.env.REPOSITORY_TYPE;

export class RepositoryModule {
  static register(repositoryType: RepositoryType): DynamicModule {
    let repositoryModule;

    switch (repositoryType) {
      case 'memory':
        repositoryModule = InMemoryRepositoryModule;
        break;
      case 'postgres':
        repositoryModule = PostgresRepositoryModule;
        break;
      default:
        throw new Exception('Please provide a proper "REPOSITORY_TYPE"');
    }

    return {
      module: repositoryModule,
    }
  }
}
