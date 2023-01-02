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

  constructor(logger: LoggerService, userController: UserController) {
    this.port = 8000;
    this.app = express();
    this.server = null;
    this.logger = logger;
    this.userController = userController;
  }

  useRoutes() {
    this.app.use("/users", this.userController.router);
  }

  async init() {
    this.useRoutes();
    this.server = this.app.listen(this.port);
    this.logger.log(`Server was started on ${this.port} port`);
  }
}
