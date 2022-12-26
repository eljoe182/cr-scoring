import { DataSourceOptions } from 'typeorm';

export class TypeOrmConfigFactory {
  public static createConnectionOptions(params: DataSourceOptions): DataSourceOptions {
    return params;
  }
}
