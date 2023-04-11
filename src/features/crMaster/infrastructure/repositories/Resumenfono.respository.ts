import { DataSource } from 'typeorm';
import { ResumenfonoEntity } from '../../../../shared/infrastructure/persistance/entities';
import { IResumenfonoRepository } from '../../../../features/crMaster/infrastructure/interface/IResumenfonoRepository';

export default class ResumenfonoRepository implements IResumenfonoRepository {
  constructor(private orm: DataSource) {}

  public async getInfoResumenfono(phoneNumber: string): Promise<ResumenfonoEntity> {
    const orm = await this.orm.initialize();
    const repository = orm.manager.getRepository(ResumenfonoEntity);
    return repository.findOneBy({ phoneNumber }) as unknown as ResumenfonoEntity;
  }

  public async getByPeriod(period: string): Promise<ResumenfonoEntity[]> {
    const orm = await this.orm.initialize();
    const repository = orm.manager.getRepository(ResumenfonoEntity);
    const result = (await repository.find({
      where: {
        period,
      },
    })) as unknown as ResumenfonoEntity[];
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

  async getInByPhoneNumber(phoneNumbers: string[]): Promise<ResumenfonoEntity[]> {
    const orm = await this.orm.initialize();
    const repository = orm.manager.getRepository(ResumenfonoEntity);
    const result = (await repository
      .createQueryBuilder()
      .where('phone_number IN (:...phoneNumbers)', { phoneNumbers })
      .getMany()) as unknown as ResumenfonoEntity[];
    orm.destroy();
    return result;
  }

  async getDistinctByField(field: string): Promise<unknown> {
    const orm = await this.orm.initialize();
    const repository = orm.manager.getRepository(ResumenfonoEntity);
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
