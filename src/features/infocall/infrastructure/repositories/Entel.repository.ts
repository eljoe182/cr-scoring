import { DataSource } from 'typeorm';
import { EntelEntity, Entel } from '../../../../shared/infrastructure/persistance/entities';
import { IEntelRepository } from '../interface';
import { CellProviderTable } from '../../domain/contracts';

export default class EntelRepository implements IEntelRepository {
  constructor(private orm: DataSource) {}

  async getByNumber(phoneNumber: number): Promise<Entel> {
    const orm = await this.orm.initialize();
    const repository = orm.manager.getRepository(EntelEntity);
    const result = (await repository.findOneBy({ phoneNumber })) as unknown as Entel;
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
    const repository = orm.manager.getRepository(EntelEntity);
    const result = (await repository
      .createQueryBuilder()
      .where('numero IN (:...phoneNumbers)', { phoneNumbers })
      .getMany()) as unknown as Entel[];
    orm.destroy();
    return result;
  }

  async getDistinctByField(field: string): Promise<unknown> {
    const orm = await this.orm.initialize();
    const repository = orm.manager.getRepository(EntelEntity);
    const result = await repository
      .createQueryBuilder()
      .select(field, 'value')
      .distinct(true)
      .where(`${field} IS NOT NULL`)
      .orderBy(field, 'DESC')
      .execute();
    orm.destroy();
    return result;
  }
}
