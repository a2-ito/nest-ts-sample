import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
//import { UserRepository } from './repository/memory/user.repository';
import { RepositoryModule } from './repository/module';
import { PostgresRepositoryModule } from './repository/postgres/module';

@Module({
  //imports: [TypeOrmModule.forFeature([UserEntity])],
  imports: [RepositoryModule.register(process.env.REPOSITORY_TYPE)],
  //imports: [PostgresRepositoryModule],
  //imports: [RepositoryModule],
  //imports: [PostgresRepositoryModule],
  //providers: [UserRepository, UsersService],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
