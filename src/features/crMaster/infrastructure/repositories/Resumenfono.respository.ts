import { DataSource } from 'typeorm';
import { Resumenfono } from '@shared/domain/entities/CRMaster/Resumenfono.entity';
import { IResumenfonoRepository } from '@feat/crMaster/domain/interface/IResumenfonoRepository';

export default class ResumenfonoRepository implements IResumenfonoRepository {
  constructor(private orm: DataSource) {}

  public async getInfoResumenfono(phoneNumber: string): Promise<Resumenfono> {
    const orm = await this.orm.initialize();
    const repository = orm.manager.getRepository(Resumenfono);
    return repository.findOneBy({ phoneNumber }) as unknown as Resumenfono;
  }

  public async getByPeriod(period: string): Promise<Resumenfono[]> {
    const orm = await this.orm.initialize();
    const repository = orm.manager.getRepository(Resumenfono);
    const result = (await repository.find({
      where: {
        period,
      },
      take: 10,
    })) as unknown as Resumenfono[];
    orm.destroy();
    return result;
  }

  async getFields(): Promise<unknown> {
    const orm = await this.orm.initialize();
    const repository = await orm.manager.query(`
      SELECT COLUMN_NAME
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_NAME = N'RS_OP_FG_RESUMENFONO'
    `);
    return repository;
  }

  async getInByPhoneNumber(phoneNumbers: string[]): Promise<Resumenfono[]> {
    const orm = await this.orm.initialize();
    const repository = orm.manager.getRepository(Resumenfono);
    const result = (await repository
      .createQueryBuilder()
      .where('phone_number IN (:...phoneNumbers)', { phoneNumbers })
      .getMany()) as unknown as Resumenfono[];
    orm.destroy();
    return result;
  }
}
