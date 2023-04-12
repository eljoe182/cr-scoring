import { DataSource } from 'typeorm';

export class ScoringClient {
  constructor(private dataSource: any) {}

  public async initialize() {
    const dataSource = new DataSource(this.dataSource.config);
    return dataSource.initialize();
  }
}
