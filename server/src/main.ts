import { IExceptionFilter } from "./errors/exception.filter.interface";
import { TYPES } from "./types";
import { Container, ContainerModule, interfaces } from "inversify";
import { App } from "./app";
import { ExceptionFilter } from "./errors/exception.filter";
import { ILogger } from "./logger/logger.interface";

import { LoggerService } from "./logger/logger.service";
import { UserController } from "./users/users.controller";
import { IUsers } from "./users/users.interface";

export const appBinding = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILogger>(TYPES.ILogger).to(LoggerService);
  bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
  bind<IUsers>(TYPES.IUsers).to(UserController);
  bind<App>(TYPES.App).to(App);
});

async function bootstrap() {
  const appContainer = new Container();
  appContainer.load(appBinding);
  const app = appContainer.get(TYPES.App) as App;

  await app.init();

  return { app, appContainer };
}

bootstrap();
