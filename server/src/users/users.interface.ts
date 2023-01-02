import { NextFunction, Response, Request } from "express";
import { BaseController } from "../common/base.controller";

export interface IUsers extends BaseController {
  login(req: Request, res: Response, next: NextFunction): void;
  register(req: Request, res: Response, next: NextFunction): void;
}
