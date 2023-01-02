import { ExceptionFilter } from "./errors/exception.filter";
import { Server } from "node:http";

import express, { Express } from "express";
import { LoggerService } from "./logger/logger.service";

import { UserController } from "./users/user.controller";

export class App {
  app: Express;
  port: number;
  server: Server | null;
  logger: LoggerService;
  userController: UserController;
  exceptionFilter: ExceptionFilter;

  constructor(
    logger: LoggerService,
    userController: UserController,
    exceptionFilter: ExceptionFilter
  ) {
    this.port = 8000;
    this.app = express();
    this.server = null;
    this.logger = logger;
    this.userController = userController;
    this.exceptionFilter = exceptionFilter;
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
