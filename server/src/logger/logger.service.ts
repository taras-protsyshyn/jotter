import { ILogger } from "./logger.interface";
import winston, { Logger } from "winston";
import { injectable } from "inversify";

import "reflect-metadata";

@injectable()
export class LoggerService implements ILogger {
  logger: Logger;

  constructor() {
    const myFormat = winston.format.printf(({ level, message, timestamp }) => {
      return `${timestamp} > ${level}: ${message}`;
    });

    this.logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        myFormat
      ),
      transports: [new winston.transports.Console()],
    });
  }

  info(message: string) {
    this.logger.info(message);
  }
  warn(message: string) {
    this.logger.warn(message);
  }
  error(message: string) {
    this.logger.error(message);
  }
}
