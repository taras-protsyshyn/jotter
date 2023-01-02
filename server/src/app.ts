import { TYPES } from "./types";
import { IExceptionFilter } from "./errors/exception.filter.interface";
import { ILogger } from "./logger/logger.interface";
import { inject, injectable } from "inversify";

import { Server } from "node:http";

import express, { Express } from "express";

import "reflect-metadata";
import { IUsers } from "./users/users.interface";

@injectable()
export class App {
  app: Express;
  server: Server | null;
  port: number;

  constructor(
    @inject(TYPES.ILogger) private logger: ILogger,
    @inject(TYPES.IUsers) private userController: IUsers,
    @inject(TYPES.ExceptionFilter) private exceptionFilter: IExceptionFilter
  ) {
    this.server = null;
    this.port = 8000;
    this.app = express();
  }

  useRoutes() {
    this.app.use("/users", this.userController.router);
  }

  useExceptionFilters() {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  async init() {
    this.useRoutes();
    this.useExceptionFilters();
    this.server = this.app.listen(this.port);
    this.logger.log(`Server was started on ${this.port} port`);
  }
}
