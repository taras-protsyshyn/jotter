import { ILogger } from "./../logger/logger.interface";
import { inject, injectable } from "inversify";
import { HttpError } from "./http-errors.class";
import { IExceptionFilter } from "./exception.filter.interface";
import { NextFunction, Request, Response } from "express";
import { TYPES } from "../types";

import "reflect-metadata";

@injectable()
export class ExceptionFilter implements IExceptionFilter {
  constructor(@inject(TYPES.ILogger) private logger: ILogger) {}

  catch(err: Error | HttpError, req: Request, res: Response, next: NextFunction) {
    if (err instanceof HttpError) {
      this.logger.error(`[${err.context || ""} > code: ${err.statusCode}] ${err.message}`);
      res.status(err.statusCode).send({ errors: err.message });
    } else {
      this.logger.error(`${err.message}`);
      res.status(500).send({ errors: err.message });
    }
  }
}
