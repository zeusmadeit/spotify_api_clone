import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import * as bcrypt from "bcryptjs";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  async create(userDTO: CreateUserDTO): Promise<User> {
    const salt = await bcrypt.genSalt();
    userDTO.password = await bcrypt.hash(userDTO.password, salt);
    const user = await this.usersRepository.save(userDTO);
    delete user.password;
    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<User | null> {
    return await this.usersRepository.findOneBy({id});
  }

  update(id: number, recordToUpdate: UpdateUserDTO): Promise<UpdateResult> {
    return this.usersRepository.update(id, recordToUpdate);
  }

  delete(id: number) {
    return this.usersRepository.delete(id);
  }
}
