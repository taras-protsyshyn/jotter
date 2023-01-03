import { injectable } from "inversify";

import { UserLoginDto } from "./dto/user-login.tdo";
import { UserRegisterDto } from "./dto/user-register.dto";

import { IUserService } from "./user.service.interface";
import "reflect-metadata";
import { User } from "./user.entity";

@injectable()
export class UserService implements IUserService {
  async createUser({ email, name, password }: UserRegisterDto) {
    const user = new User(email, name);
    await user.setPassword(password);

    return user;
  }

  validateUser(dto: UserLoginDto): Promise<boolean> {
    return Promise.resolve(false);
  }
}
