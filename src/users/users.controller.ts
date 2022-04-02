import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSerializer, UserResponse } from './serializer/userserializer';

@Controller('users')
export class UsersController {
  private userSerializer: UserSerializer;

  constructor(private readonly usersService: UsersService) {
    this.userSerializer = new UserSerializer();
  }

  @Get()
  async findAll() {
    let result = await this.usersService.findAll();
    return this.userSerializer.users(result);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    let result = await this.usersService.findById(id);
    return this.userSerializer.user(result);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    let result = await this.usersService.createOne(createUserDto);
    return this.userSerializer.user(result)
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    let result = await this.usersService.update(id, updateUserDto);
    console.log(result);
    return this.userSerializer.user(result);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    this.usersService.remove(id);
    return this.userSerializer.delete();
  }

}
