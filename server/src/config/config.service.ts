import { ILogger } from "./../logger/logger.interface";
import { Logger } from "tslog";
import { TYPES } from "./../types";
import { IConfigService } from "./config.service.interface";

import { config, DotenvConfigOutput, DotenvParseOutput } from "dotenv";
import { inject, injectable } from "inversify";

@injectable()
export class ConfigService implements IConfigService {
  private config: DotenvParseOutput;

  constructor(@inject(TYPES.ILogger) private logger: ILogger) {
    const result: DotenvConfigOutput = config();

    if (result.error) {
      this.logger.error(`[ConfigService] failed > ${result.error.message}`);
    } else {
      this.logger.log(`[ConfigService] > dotenv successfully loaded`);
      this.config = result.parsed as DotenvParseOutput;
    }
  }

  get<T extends string | number>(key: string): T {
    return this.config[key] as T;
  }
}
