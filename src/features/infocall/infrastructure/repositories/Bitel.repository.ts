import { DataSource } from 'typeorm';
import { BitelEntity, Bitel } from '../../../../shared/infrastructure/persistance/entities';
import { IBitelRepository } from '../interface';
import { CellProviderTable } from '../../domain/contracts';

export default class BitelRepository implements IBitelRepository {
  constructor(private orm: DataSource) {}

  async getByNumber(phoneNumber: number): Promise<Bitel> {
    const orm = await this.orm.initialize();
    const repository = orm.manager.getRepository(BitelEntity);
    const result = (await repository.findOneBy({ phoneNumber })) as unknown as Bitel;
    orm.destroy();
    return result;
  }

  async getFields(): Promise<CellProviderTable[]> {
    const orm = await this.orm.initialize();
    const repository = await orm.manager.query('SHOW COLUMNS FROM bitel');
    orm.destroy();
    return repository;
  }

  async getInByPhoneNumber(phoneNumbers: number[]): Promise<Bitel[]> {
    const orm = await this.orm.initialize();
    const repository = orm.manager.getRepository(BitelEntity);
    const result = (await repository
      .createQueryBuilder()
      .where('numero IN (:...phoneNumbers)', { phoneNumbers })
      .getMany()) as unknown as Bitel[];
    orm.destroy();
    return result;
  }

  async getDistinctByField(field: string): Promise<unknown> {
    const orm = await this.orm.initialize();
    const repository = orm.manager.getRepository(BitelEntity);
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
