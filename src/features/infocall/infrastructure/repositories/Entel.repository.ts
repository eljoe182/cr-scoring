import { DataSource } from 'typeorm';
import { IEntelRepository } from '../interface/IEntelRepository';
import { Entel } from '@shared/domain/entities/Infocall';
import { CellProviderTable } from '@feat/infocall/domain/contracts/CellProviderTable';

export default class EntelRepository implements IEntelRepository {
  constructor(private orm: DataSource) {}

  async getByNumber(phoneNumber: number): Promise<Entel> {
    const orm = await this.orm.initialize();
    const repository = orm.manager.getRepository(Entel);
    const result = await repository.findOneBy({ phoneNumber }) as unknown as Entel;
    orm.destroy();
    return result;
  }

  async getFields(): Promise<CellProviderTable[]> {
    const orm = await this.orm.initialize();
    const repository = await orm.manager.query('SHOW COLUMNS FROM entel');
    orm.destroy();
    return repository;
  }

  async getInByPhoneNumber(phoneNumbers: number[]): Promise<Entel[]> {
    const orm = await this.orm.initialize();
    const repository = orm.manager.getRepository(Entel);
    const result = await repository.createQueryBuilder().where('numero IN (:...phoneNumbers)', { phoneNumbers }).getMany() as unknown as Entel[];
    orm.destroy();
    return result;
  }
}
