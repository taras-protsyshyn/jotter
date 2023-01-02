import { UserRegisterDto } from "./dto/user-register.dto";
import { UserLoginDto } from "./dto/user-login.tdo";
import { inject, injectable } from "inversify";
import { Response, Request, NextFunction } from "express";

import { ILogger } from "../logger/logger.interface";
import { TYPES } from "../types";
import { HttpError } from "../errors/http-errors.class";
import { BaseController } from "../common/base.controller";
import { IUsers } from "./users.interface";

import "reflect-metadata";
import { User } from "./user.entity";

@injectable()
export class UserController extends BaseController implements IUsers {
  constructor(@inject(TYPES.ILogger) loggerService: ILogger) {
    super(loggerService);

    this.bindRoutes([
      { path: "/register", method: "post", func: this.register },
      { path: "/login", method: "post", func: this.login },
    ]);
  }

  login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction) {
    console.log(req.body);

    next(new HttpError(401, "Not authorized", "User"));
  }

  async register(req: Request<{}, {}, UserRegisterDto>, res: Response, next: NextFunction) {
    const user = new User(req.body.email, req.body.name);
    await user.setPassword(req.body.password);

    this.ok(res, user);
  }
}
