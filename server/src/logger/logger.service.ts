import { ILogger } from "./logger.interface";
import { Logger } from "tslog";
import { injectable } from "inversify";

import "reflect-metadata";

@injectable()
export class LoggerService<LogObj = unknown> implements ILogger {
  logger: Logger<LogObj>;

  constructor() {
    this.logger = new Logger<LogObj>({ hideLogPositionForProduction: true });
  }

  log(...args: unknown[]) {
    this.logger.info(...args);
  }

  warn(...args: unknown[]) {
    this.logger.warn(...args);
  }

  error(...args: unknown[]) {
    this.logger.error(...args);
  }
}
