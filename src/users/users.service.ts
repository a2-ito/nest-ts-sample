import { Injectable } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './interfaces/user.interface';
import { IUserRepository } from './repository/interface/i-user.repository';
//import { UserRepository } from './repository/postgres/user.repository';

@Injectable()
export class UsersService {
  constructor(
    //@InjectRepository(UserEntity)
    //private readonly userRepository: Repository<UserEntity>,
    //private readonly userRepository: UserRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  async findAll(): Promise<User[]> {
    //const entities = await this.userRepository.find();
    const entities = await this.userRepository.findAll();
    return entities as User[];
    //return this.userRepository.findAll();
  }

  async findById(id: string): Promise<User | null> {
    const entity = await this.userRepository.findById(id);
    return entity as User;
  }

  async createOne(dto: CreateUserDto): Promise<User> {
    const id = uuidV4();
    const entity = {...dto, id} as UserEntity;
    await this.userRepository.createOne(entity);
    return entity;
  }

    /*
  async update(dto: UpdateUserDto): Promise<User> {
    const entity = dto as UserEntity;
    await this.userRepository.updateOne(entity);
    return entity;
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.deleteOne(id);
  }
     */
}
