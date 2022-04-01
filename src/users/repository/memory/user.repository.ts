import { Injectable } from '@nestjs/common';
import  DB from "./Database";
import { User } from '../../interfaces/user.interface';
import { UserEntity } from '../../entities/user.entity';
import { IUserRepository } from "../interface/i-user.repository";
import { v4 as uuidV4 } from 'uuid';

@Injectable()
class UserRepositoryImpl implements IUserRepository {
  public constructor() {
    const users = [
      {
        id: '6a414c88-4613-486d-9990-80c1de52eea4',
        name: 'sample1',
        firstname: 'sample1_firstname',
        lastname: 'sample1_lastname',
        email: 'hoge@gmail.com',
      },
    ];
    //const user2 = new User(2, "sample2", "sample1_firstname", "sample2_lastname", "sample2@example.com");
    DB.users = users;
  }

    /*
  private convert(r: User) {
    let user = new User(r.id, r.name, r.firstname, r.lastname, r.email);
    return user;
  }
     */

  public async findAll(): Promise<User[]> {
    //console.log('Repository findAll');
    let queryResults = DB.users;
    const results = queryResults.map(
      (m): User => {
        //return this.convert(m);
        return m;
      }
    );
    return results;
  }
  public async findById(id: string): Promise<User | null> {
    console.log('Repository findById');
    let queryResults = DB.users.filter((user):boolean => user.id === id);
    if (queryResults.length === 0) {
      return null;
    }
    //return this.convert(queryResults[0]);
    return queryResults[0];
  };

  public async createOne(user: User): Promise<void> {
    console.log('Repository createUser ' + user.email);
    const userIds = DB.users.map((user): string => user.id);
    const newId = uuidV4();
    DB.users.push(user);
  };

  /*
  public async updateOne(user: User): Promise<User> {
    console.log('Repository updateUser');
    let returnUser: User;

    DB.users = DB.users.map(
      (tu): User => {
        console.log(tu.id + ' ' + tu.name);
        console.log(tu.id);
        if (tu.id === user.id) {
          let name;
          console.log('update -> ' + tu.id);
          if (user.name) {
            tu.name = user.name;
          }
          return tu;
        } else {
          return tu;
        }
      });
    return user;
  };

  public async deleteOne(id: number): Promise<null> {
    console.log('Repository delete');
    DB.users = DB.users.filter(
      (user): boolean => {
        return user.id !== id;
      }
    );
    return null;
  };
  */

}

export { UserRepositoryImpl as UserInMemoryRepository };
