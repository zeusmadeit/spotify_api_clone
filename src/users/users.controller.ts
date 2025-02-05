import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { PartialType } from '@nestjs/mapped-types';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post() // Functionality moved into the auth module - 'auth/signup'
  // async create(@Body() createUserDTO: CreateUserDTO): Promise<User> {
  //   return await this.usersService.create(createUserDTO);
  // }

  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User | null> {
    return await this.usersService.findOne({id: id});
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDTO: UpdateUserDTO) {
    return this.usersService.update(id, updateUserDTO);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    this.usersService.delete(id);
  }
}
