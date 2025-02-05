import { Injectable, UnauthorizedException } from "@nestjs/common";
// import { UsersService } from "src/users/users.service";
import * as bcrypt from "bcryptjs";
import { User } from "src/users/entities/user.entity";
import { LoginDTO } from "./dto/login.dto";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  async login(loginDTO: LoginDTO): Promise<User | Partial<User>> {
    const user = await this.usersRepository.findOneBy({email: loginDTO.email});
    if (!user) {
      throw new UnauthorizedException("User does not exist");
    }
    const passwordMatched = await bcrypt.compare(loginDTO.password, user.password);
    if (passwordMatched) {
      const z: Partial<User> = { ...user };
      delete z.password;
      return z;
    } else {
      throw new UnauthorizedException("Password does not match");
    }
  }

}
