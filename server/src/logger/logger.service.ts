import { Logger } from "tslog";

export class LoggerService<LogObj = unknown> {
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
