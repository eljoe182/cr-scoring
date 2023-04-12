import { DataSource } from 'typeorm';

export class InfocallClient {
  constructor(private dataSource: any) {}

  public async initialize() {
    const dataSource = new DataSource(this.dataSource.config);
    return dataSource.initialize();
  }
}
