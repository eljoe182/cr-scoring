import { DataSourceOptions } from 'typeorm';
import config from '@app/config';
import { Bitel, Claro, Entel, Movistar } from '@shared/domain/entities/Infocall';

export class InfocallConfig {
  public config: DataSourceOptions;

  constructor() {
    this.config = {
      type: 'mysql',
      host: config.DATABASES.INFOCALL.HOST,
      port: Number(config.DATABASES.INFOCALL.PORT),
      username: config.DATABASES.INFOCALL.USERNAME,
      password: config.DATABASES.INFOCALL.PASSWORD,
      database: config.DATABASES.INFOCALL.DATABASE,
      entities: [Bitel, Claro, Entel, Movistar],
      logging: true,
      synchronize: false,
    };
  }

  public getDataSourceOptions(): DataSourceOptions {
    return this.config;
  }
}
