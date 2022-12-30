import { DataSource } from 'typeorm';
import { IBitelRepository } from '@feat/infocall/infrastructure/interface/IBitelRepository';
import { Bitel } from '@shared/domain/entities/Infocall/bitel';
import { CellProviderTable } from '@feat/infocall/domain/contracts/CellProviderTable';

export default class BitelRepository implements IBitelRepository {
  constructor(private orm: DataSource) {}

  async getByNumber(phoneNumber: number): Promise<Bitel> {
    const orm = await this.orm.initialize();
    const repository = orm.manager.getRepository(Bitel);
    return repository.findOneBy({ phoneNumber }) as unknown as Bitel;
  }

  async getFields(): Promise<CellProviderTable[]> {
    const orm = await this.orm.initialize();
    const repository = await orm.manager.query('SHOW COLUMNS FROM bitel');
    return repository;
  }
}
