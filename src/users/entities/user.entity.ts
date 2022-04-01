import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({name: 'users'})
export class UserEntity {
  @PrimaryColumn({ length: 36 })
  id: string;

  @Column({ length: 64 })
  name: string;

  @Column({ length: 64 })
  firstname: string;

  @Column({ length: 64 })
  lastname: string;

  @Column({ length: 64 })
  email: string;
}
