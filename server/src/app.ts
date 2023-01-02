import { Server } from "node:http";

import express, { Express } from "express";
import { LoggerService } from "./logger/logger.service";

export class App {
  app: Express;
  port: number;
  server: Server | null;
  logger: LoggerService;

  constructor(logger: LoggerService) {
    this.port = 8000;
    this.app = express();
    this.server = null;
    this.logger = logger;
  }

  useRoutes() {
    this.app.get("/", (req, res) => {
      res.send("Hello Jotter!");
    });
  }

  async init() {
    this.useRoutes();
    this.server = this.app.listen();
    this.logger.log(`Server was started on ${this.port} port`);
  }
}
