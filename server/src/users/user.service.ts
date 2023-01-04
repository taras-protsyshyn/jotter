import { IConfigService } from "./../config/config.service.interface";
import { ConfigService } from "./../config/config.service";
import { inject, injectable } from "inversify";

import { UserLoginDto } from "./dto/user-login.tdo";
import { UserRegisterDto } from "./dto/user-register.dto";

import { IUserService } from "./user.service.interface";
import "reflect-metadata";
import { User } from "./user.entity";
import { TYPES } from "../types";

@injectable()
export class UserService implements IUserService {
  constructor(@inject(TYPES.ConfigService) private configService: IConfigService) {}

  async createUser({ email, name, password }: UserRegisterDto) {
    const user = new User(email, name);
    const salt = this.configService.get("SALT");

    await user.setPassword(password, Number(salt));

    return user;
  }

  validateUser(dto: UserLoginDto): Promise<boolean> {
    return Promise.resolve(false);
  }
}
