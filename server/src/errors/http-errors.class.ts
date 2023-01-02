import { LoggerService } from "./../logger/logger.service";
import { ExceptionFilter } from "./exception.filter";

export class HttpError extends Error {
  statusCode: number;
  context?: string;

  constructor(statusCode: number, message: string, context?: string) {
    super(message);

    this.statusCode = statusCode;
    this.context = context;
  }
}
