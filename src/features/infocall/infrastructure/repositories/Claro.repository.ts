import { DataSource } from 'typeorm';
import { IClaroRepository } from '@feat/infocall/infrastructure/interface/IClaroRepository';
import { Claro } from '@shared/domain/entities/Infocall';
import { CellProviderTable } from '@feat/infocall/domain/contracts/CellProviderTable';

export default class ClaroRepository implements IClaroRepository {
  constructor(private orm: DataSource) {}

  async getByNumber(phoneNumber: number): Promise<Claro> {
    const orm = await this.orm.initialize();
    const repository = orm.manager.getRepository(Claro);
    return repository.findOneBy({ phoneNumber }) as unknown as Claro;
  }

  async getFields(): Promise<CellProviderTable[]> {
    const orm = await this.orm.initialize();
    const repository = await orm.manager.query('SHOW COLUMNS FROM claro');
    return repository;
  }
}
