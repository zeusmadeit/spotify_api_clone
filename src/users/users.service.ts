import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Save the user in the database
    const user = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.email = createUserDto.email;
    user.password = createUserDto.password;

    return await this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<User | null> {
    return await this.usersRepository.findOneBy({id});
  }

  update(id: number, recordToUpdate: UpdateUserDto): Promise<UpdateResult> {
    return this.usersRepository.update(id, recordToUpdate);
  }

  delete(id: number) {
    return this.usersRepository.delete(id);
  }
}
