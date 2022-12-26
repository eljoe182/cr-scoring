import { DataSource, DataSourceOptions } from 'typeorm';

export default class TypeOrmFactory {
  public createDataSource(options: DataSourceOptions): DataSource {
    return new DataSource(options);
  }
}
