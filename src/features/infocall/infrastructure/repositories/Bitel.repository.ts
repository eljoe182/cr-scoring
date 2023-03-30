import { DataSource } from 'typeorm';
import { IBitelRepository } from '@feat/infocall/infrastructure/interface/IBitelRepository';
import { Bitel } from '@shared/domain/entities/Infocall/Bitel.entity';
import { CellProviderTable } from '@feat/infocall/domain/contracts/CellProviderTable';

export default class BitelRepository implements IBitelRepository {
  constructor(private orm: DataSource) {}

  async getByNumber(phoneNumber: number): Promise<Bitel> {
    const orm = await this.orm.initialize();
    const repository = orm.manager.getRepository(Bitel);
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
    const repository = orm.manager.getRepository(Bitel);
    const result = (await repository
      .createQueryBuilder()
      .where('numero IN (:...phoneNumbers)', { phoneNumbers })
      .getMany()) as unknown as Bitel[];
    orm.destroy();
    return result;
  }

  async getDistinctByField(field: string): Promise<unknown> {
    const orm = await this.orm.initialize();
    const repository = orm.manager.getRepository(Bitel);
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
