import { inject, injectable } from "inversify";
import { Response, Request, NextFunction } from "express";

import { ILogger } from "../logger/logger.interface";
import { TYPES } from "../types";
import { HttpError } from "../errors/http-errors.class";
import { BaseController } from "../common/base.controller";
import { IUsers } from "./users.interface";

import "reflect-metadata";

@injectable()
export class UserController extends BaseController implements IUsers {
  constructor(@inject(TYPES.ILogger) loggerService: ILogger) {
    super(loggerService);

    this.bindRoutes([
      { path: "/register", method: "post", func: this.register },
      { path: "/login", method: "post", func: this.login },
    ]);
  }

  login(req: Request, res: Response, next: NextFunction) {
    next(new HttpError(401, "Not authorized", "User"));
  }

  register(req: Request, res: Response, next: NextFunction) {
    this.ok(res, "register");
  }
}
