import { Request, Response, NextFunction } from "express";
import { ClassConstructor, plainToClass } from "class-transformer";

import { IMiddleware } from "./middleware.interface";
import { validate } from "class-validator";
import { inject } from "inversify";
import { TYPES } from "../types";
import { ILogger } from "../logger/logger.interface";

export class ValidateMiddleware implements IMiddleware {
  constructor(private classToValidate: ClassConstructor<object>, private logger: ILogger) {}

  execute({ body }: Request, res: Response, next: NextFunction): void {
    const instance = plainToClass(this.classToValidate, body);

    validate(instance).then((errors) => {
      if (errors.length > 0) {
        const errMessages = errors.reduce((acc: Record<string, string[]>, err) => {
          if (err.constraints && err.property) {
            acc[err.property] = Object.values(err.constraints);
          }

          return acc;
        }, {});

        this.logger.error(`[ValidateError] > ${errors}`);

        res.status(400).send({ errors: errMessages });
      } else {
        next();
      }
    });
  }
}
