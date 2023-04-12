import { DataSourceOptions } from 'typeorm';
import config from '../../../../app/config';
import {
  ResumenfonoEntity,
  FRVicidialListEntity,
  FRVicidialList1121Entity,
  FRVicidialList2121Entity,
  VicidialListsEntity,
  CRWalletEntity,
  ManagementHistoryEntity,
} from '../../../infrastructure/persistance/entities';

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
      entities: [
        ResumenfonoEntity,
        FRVicidialListEntity,
        FRVicidialList1121Entity,
        FRVicidialList2121Entity,
        VicidialListsEntity,
        ManagementHistoryEntity,
        CRWalletEntity,
      ],
      logging: true,
      synchronize: false,
      requestTimeout: 300000,
      options: {
        encrypt: false,
      },
    };
  }

  public getDataSourceOptions(): DataSourceOptions {
    return this.config;
  }
}
