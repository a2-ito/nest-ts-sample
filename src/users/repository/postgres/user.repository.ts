import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityRepository } from 'typeorm';
import { User } from '../../interfaces/user.interface';
import { UserEntity } from '../../entities/user.entity';
import { IUserRepository } from "../interface/i-user.repository";
import { CreateUserDto } from '../../dto/create-user.dto';

@Injectable()
export class UserTypeormRepository implements IUserRepository {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userTypeormEntityRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userTypeormEntityRepository.find();
  }

  async findById(id: string): Promise<User | null> {
    const entity = await this.userTypeormEntityRepository.findOne({ id });
    return entity as User;
  }

  async createOne(user: User): Promise<void> {
    await this.userTypeormEntityRepository.insert(user);
  }

}
