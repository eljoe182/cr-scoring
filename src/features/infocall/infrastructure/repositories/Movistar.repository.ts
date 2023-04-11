import { DataSource } from 'typeorm';
import { IMovistarRepository } from '../interface/IMovistarRepository';
import { MovistarEntity } from '../../../../shared/infrastructure/persistance/entities';
import { CellProviderTable } from '../../../../features/infocall/domain/contracts/CellProviderTable';

export default class MovistarRepository implements IMovistarRepository {
  constructor(private orm: DataSource) {}

  async getByNumber(phoneNumber: number): Promise<MovistarEntity> {
    const orm = await this.orm.initialize();
    const repository = orm.manager.getRepository(MovistarEntity);
    const result = (await repository.findOneBy({ phoneNumber })) as unknown as MovistarEntity;
    orm.destroy();
    return result;
  }

  async getFields(): Promise<CellProviderTable[]> {
    const orm = await this.orm.initialize();
    const repository = await orm.manager.query('SHOW COLUMNS FROM movistar');
    orm.destroy();
    return repository;
  }

  async getInByPhoneNumber(phoneNumbers: number[]): Promise<MovistarEntity[]> {
    const orm = await this.orm.initialize();
    const repository = orm.manager.getRepository(MovistarEntity);
    const result = (await repository
      .createQueryBuilder()
      .where('numero IN (:...phoneNumbers)', { phoneNumbers })
      .getMany()) as unknown as MovistarEntity[];
    orm.destroy();
    return result;
  }

  async getDistinctByField(field: string): Promise<unknown> {
    const orm = await this.orm.initialize();
    const repository = orm.manager.getRepository(MovistarEntity);
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
