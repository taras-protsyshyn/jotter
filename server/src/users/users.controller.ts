import { ValidateMiddleware } from "./../common/validate.middleware";
import { IUserService } from "./user.service.interface";
import { UserRegisterDto } from "./dto/user-register.dto";
import { UserLoginDto } from "./dto/user-login.tdo";
import { inject, injectable } from "inversify";
import { Response, Request, NextFunction } from "express";

import { ILogger } from "../logger/logger.interface";
import { TYPES } from "../types";
import { HttpError } from "../errors/http-errors.class";
import { BaseController } from "../common/base.controller";
import { IUsers } from "./users.interface";
import { User } from "./user.entity";

import "reflect-metadata";

@injectable()
export class UserController extends BaseController implements IUsers {
  constructor(
    @inject(TYPES.ILogger) loggerService: ILogger,
    @inject(TYPES.UsersService) private userService: IUserService
  ) {
    super(loggerService);

    this.bindRoutes([
      {
        path: "/register",
        method: "post",
        func: this.register,
        middleware: [new ValidateMiddleware(UserRegisterDto, loggerService)],
      },
      { path: "/login", method: "post", func: this.login },
    ]);
  }

  login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction) {
    console.log(req.body);

    next(new HttpError(401, "Not authorized", "User"));
  }

  async register(req: Request<{}, {}, UserRegisterDto>, res: Response, next: NextFunction) {
    const newUser = await this.userService.createUser(req.body);

    if (!newUser) {
      return next(new HttpError(422, "User already exist"));
    }

    this.ok(res, newUser);
  }
}
