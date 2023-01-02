import { DataSource } from 'typeorm';
import { IResumenfonoRepository } from '../interface/IResumenfonoRepository';

export default class ResumenfonoRepository implements IResumenfonoRepository {
  constructor(private orm: DataSource) {}

  async getFieldsResumenfono(): Promise<unknown> {
    const orm = await this.orm.initialize();
    const repository = await orm.manager.query(`
      SELECT *
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_NAME = N'RS_OP_FG_RESUMENFONO'
    `);
    return repository;
  }
}
