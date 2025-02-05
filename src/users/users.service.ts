import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import * as bcrypt from "bcryptjs";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  async create(userDTO: CreateUserDTO): Promise<User | Partial<User>> {
    // check for a duplicate user before attempting to create one
    const duplicate_user = await this.usersRepository.findOneBy({email: userDTO.email});
    if (duplicate_user) {
      throw new HttpException('user with email already exist', HttpStatus.CONFLICT,);
    }
    // Hash the password before saving user to database
    const salt = await bcrypt.genSalt();
    userDTO.password = await bcrypt.hash(userDTO.password, salt);
    const user: Partial<User> = await this.usersRepository.save(userDTO);
    // delete password from returned values 
    // to avoid revealing sensitive info
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
