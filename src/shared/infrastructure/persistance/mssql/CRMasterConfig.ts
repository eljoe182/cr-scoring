import { DataSourceOptions } from 'typeorm';
import config from '@app/config';
import {
  Resumenfono,
  FRVicidialList,
  FRVicidialList1121,
  FRVicidialList2121,
  VicidialLists,
} from '@shared/domain/entities/CRMaster';

export class CRMasterConfig {
  public config: DataSourceOptions;

  constructor() {
    this.config = {
      type: 'mssql',
      host: config.DATABASES.CR_MASTER.HOST,
      port: Number(config.DATABASES.CR_MASTER.PORT),
      username: config.DATABASES.CR_MASTER.USERNAME,
      password: config.DATABASES.CR_MASTER.PASSWORD,
      database: config.DATABASES.CR_MASTER.DATABASE,
      entities: [Resumenfono, FRVicidialList, FRVicidialList1121, FRVicidialList2121, VicidialLists],
      logging: true,
      synchronize: false,
      options: {
        encrypt: false,
      },
    };
  }

  public getDataSourceOptions(): DataSourceOptions {
    return this.config;
  }
}
