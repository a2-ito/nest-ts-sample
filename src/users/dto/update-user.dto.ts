import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  readonly id: string;
  readonly name: string;
  readonly firstname: string;
  readonly lastname: string;
  readonly email: string;
}
