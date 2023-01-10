import { injectable } from "inversify";
import { ILogger } from "./../logger/logger.interface";
import { Router, Response, Request, NextFunction } from "express";

import { IControllerRoute } from "./route.interface";

import "reflect-metadata";

@injectable()
export abstract class BaseController {
  private readonly _router: Router;

  constructor(private logger: ILogger) {
    this._router = Router();
  }

  get router() {
    return this._router;
  }

  send<T>(res: Response, code: number, message: T) {
    res.type("application/json");

    return res.status(code).json(message);
  }

  ok<T>(res: Response, message: T) {
    return this.send<T>(res, 200, message);
  }

  useLogger(req: Request, res: Response, next: NextFunction) {
    this.logger.info(`[${req.method.toUpperCase()}] ${req.path}`);

    next();
  }

  protected bindRoutes(routes: IControllerRoute[]) {
    for (const route of routes) {
      this.logger.info(`[${route.method.toUpperCase()}] ${route.path} > was successfully setup`);
      const middleware = route.middleware?.map((m) => m.execute.bind(m)) || [];

      const handler = route.func.bind(this);
      const pipeline = [...middleware, this.useLogger.bind(this), handler];

      this.router[route.method](route.path, pipeline);
    }
  }
}
