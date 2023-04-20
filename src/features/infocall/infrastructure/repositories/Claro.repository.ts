import { DataSource } from 'typeorm';
import { ClaroEntity, Claro } from 'src/shared/infrastructure/persistance/entities';
import { IClaroRepository } from '../interface';
import { CellProviderTable } from '../../domain/contracts';

export default class ClaroRepository implements IClaroRepository<number | number[] | string, unknown> {
  constructor(private orm: DataSource) {}

  async getByNumber(phoneNumber: number): Promise<Claro | null> {
    const orm = await this.orm.initialize();
    const repository = orm.manager.getRepository(ClaroEntity);
    const result = await repository.findOneBy({ phoneNumber });
    orm.destroy();
    return result;
  }

  async getFields(): Promise<CellProviderTable[]> {
    const orm = await this.orm.initialize();
    const repository = await orm.manager.query('SHOW COLUMNS FROM claro');
    orm.destroy();
    return repository;
  }

  async getInByPhoneNumber(phoneNumbers: number[]): Promise<Claro[]> {
    const orm = await this.orm.initialize();
    const repository = orm.manager.getRepository(ClaroEntity);
    const result = (await repository
      .createQueryBuilder()
      .where('numero IN (:...phoneNumbers)', { phoneNumbers })
      .getMany()) as unknown as Claro[];
    orm.destroy();
    return result;
  }

  async getDistinctByField(field: string): Promise<unknown> {
    const orm = await this.orm.initialize();
    const repository = orm.manager.getRepository(ClaroEntity);
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
