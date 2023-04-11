import { DataSource } from 'typeorm';

export class CRMasterClient {
  constructor(private dataSource: any) {}

  public async initialize() {
    const dataSource = new DataSource(this.dataSource.config);
    return dataSource.initialize();
  }
}
