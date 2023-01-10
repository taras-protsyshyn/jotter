import { IConfigService } from "./config/config.service.interface";
import { ConfigService } from "./config/config.service";
import { TYPES } from "./types";
import { IExceptionFilter } from "./errors/exception.filter.interface";
import { ILogger } from "./logger/logger.interface";
import { inject, injectable } from "inversify";

import { Server } from "node:http";

import express, { Express } from "express";

import "reflect-metadata";
import { IUsers } from "./users/users.interface";
import { json } from "body-parser";

@injectable()
export class App {
  app: Express;
  server: Server | null;
  port: number;

  constructor(
    @inject(TYPES.ILogger) private logger: ILogger,
    @inject(TYPES.IUsers) private userController: IUsers,
    @inject(TYPES.ExceptionFilter) private exceptionFilter: IExceptionFilter,
    @inject(TYPES.ConfigService) private configService: IConfigService
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

  useBodyParser() {
    this.app.use(json());
  }

  async init() {
    this.useBodyParser();
    this.useRoutes();
    this.useExceptionFilters();
    this.server = this.app.listen(this.port);
    this.logger.info(`Server was started on ${this.port} port`);
  }
}
