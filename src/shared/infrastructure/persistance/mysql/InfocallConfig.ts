import { DataSourceOptions } from 'typeorm';
import config from '@app/config';
import { Bitel, Claro, Entel, Movistar } from '@shared/domain/entities/Infocall';

export class InfocallConfig {
  public config: DataSourceOptions;

  constructor() {
    this.config = {
      type: 'mysql',
      host: config.INFOCALL.HOST,
      port: Number(config.INFOCALL.PORT),
      username: config.INFOCALL.USERNAME,
      password: config.INFOCALL.PASSWORD,
      database: config.INFOCALL.DATABASE,
      entities: [Bitel, Claro, Entel, Movistar],
      logging: true,
      synchronize: false,
    };
  }

  public getDataSourceOptions(): DataSourceOptions {
    return this.config;
  }
}
