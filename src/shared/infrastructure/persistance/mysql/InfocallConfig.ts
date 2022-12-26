import { DataSourceOptions } from 'typeorm';
import config from '@app/config';
import { TypeOrmConfigFactory } from '../typeOrmConfigFactory';

export class InfocallConfig extends TypeOrmConfigFactory {
  public static createConnectionOptions(): DataSourceOptions {
    return {
      type: 'mysql',
      host: config.INFOCALL.HOST,
      port: Number(config.INFOCALL.PORT),
      username: config.INFOCALL.USERNAME,
      password: config.INFOCALL.PASSWORD,
      database: config.INFOCALL.DATABASE,
      entities: [],
      synchronize: false,
    };
  }
}
