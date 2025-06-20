import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

interface MongoDbConfig {
  connectionString: string;
}

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private configService: ConfigService) { }

  createMongooseOptions():
    | Promise<MongooseModuleOptions>
    | MongooseModuleOptions {
    const mongoDbConfig =
      this.configService.get<MongoDbConfig>('database.mongoDb');
    return {
      uri: mongoDbConfig?.connectionString,
    };
  }
}
