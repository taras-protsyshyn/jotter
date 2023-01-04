import { IConfigService } from "./config/config.service.interface";
import { IUserService } from "./users/user.service.interface";
import { IExceptionFilter } from "./errors/exception.filter.interface";
import { TYPES } from "./types";
import { Container, ContainerModule, interfaces } from "inversify";
import { App } from "./app";
import { ExceptionFilter } from "./errors/exception.filter";
import { ILogger } from "./logger/logger.interface";

import { LoggerService } from "./logger/logger.service";
import { UserController } from "./users/users.controller";
import { IUsers } from "./users/users.interface";
import { UserService } from "./users/user.service";
import { ConfigService } from "./config/config.service";

export const appBinding = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
  bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
  bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter).inSingletonScope();
  bind<IUsers>(TYPES.IUsers).to(UserController).inSingletonScope();
  bind<IUserService>(TYPES.UsersService).to(UserService).inSingletonScope();

  bind<App>(TYPES.App).to(App).inSingletonScope();
});

async function bootstrap() {
  const appContainer = new Container();
  appContainer.load(appBinding);
  const app = appContainer.get(TYPES.App) as App;

  await app.init();

  return { app, appContainer };
}

bootstrap();
