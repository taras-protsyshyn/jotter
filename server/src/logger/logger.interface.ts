import { LeveledLogMethod, Logger } from "winston";

export interface ILogger {
  logger: Logger;

  info(message: string): void;
  warn(message: string): void;
  error(message: string): void;
}
