import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
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
    // check for a duplicate user before attempting to create one
    const duplicate_user = await this.usersRepository.findOneBy({email: userDTO.email});
    if (duplicate_user) {
      throw new HttpException('user with email already exist', HttpStatus.CONFLICT,);
    }
    const salt = await bcrypt.genSalt();
    userDTO.password = await bcrypt.hash(userDTO.password, salt);
    const user = await this.usersRepository.save(userDTO);
    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(data: Partial<User>): Promise<User> {
    const user = data.email? 
      await this.usersRepository.findOneBy({ email: data.email }) : 
      await this.usersRepository.findOneBy({ id: data.id });
    if (!user) {
    throw new UnauthorizedException('Could not find user');
    }
    return user;
  }

  update(id: number, recordToUpdate: UpdateUserDTO): Promise<UpdateResult> {
    return this.usersRepository.update(id, recordToUpdate);
  }

  delete(id: number) {
    return this.usersRepository.delete(id);
  }
}
