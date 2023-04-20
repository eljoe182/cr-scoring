import { DataSource } from 'typeorm';
import { ISettingsFieldsRepository } from '../interface/ISettingsFieldsRepository';
import { FieldConfig } from 'src/features/infocall/domain/contracts';
import { SettingsFields, SettingsFieldsEntity } from 'src/shared/infrastructure/persistance/entities';
import { ResponseRepositoryBase } from 'src/shared/domain/contracts';
import { GetSettingsFieldsUseCaseParams } from '../../domain/interface/ISettingsFieldsParams';
import { IResultPagination } from 'src/shared/infrastructure/interfaces';

export default class SettingsFieldsRepository implements ISettingsFieldsRepository {
  constructor(private orm: DataSource) {}

  async save(params: FieldConfig): Promise<ResponseRepositoryBase<SettingsFields>> {
    const orm = await this.orm.initialize();
    const repository = orm.manager.getRepository(SettingsFieldsEntity);
    const data = repository.create({
      campaign: params.campaign,
      database: params.database,
      tableName: params.table,
      field: params.field,
      condition: params.condition,
      valueCondition: params.valueCondition,
      valueScore: params.valueScore,
    });

    const result = await repository.save(data);
    orm.destroy();
    return {
      message: 'SettingsFields saved successfully',
      data: result,
    };
  }

  async getAll(): Promise<ResponseRepositoryBase> {
    const orm = await this.orm.initialize();
    const repository = orm.manager.getRepository(SettingsFieldsEntity);
    const result = await repository.find();
    orm.destroy();
    return {
      message: 'SettingsFields found successfully',
      data: result,
    };
  }

  async getAllWithPagination(params: GetSettingsFieldsUseCaseParams): Promise<IResultPagination<SettingsFields[]>> {
    const orm = await this.orm.initialize();
    const repository = orm.manager.getRepository(SettingsFieldsEntity);
    const [rows, rowsCount] = await repository.findAndCount({
      where: {
        campaign: params.campaign,
      },
      take: params.size,
      skip: params.size * (params.page - 1),
      order: {
        database: 'ASC',
        tableName: 'ASC',
        valueScore: 'DESC',
      },
    });
    orm.destroy();
    return {
      page: params.page,
      limit: params.size,
      rowsCount,
      rows,
    };
  }

  async destroy(id: string): Promise<ResponseRepositoryBase> {
    const orm = await this.orm.initialize();
    const repository = orm.manager.getRepository(SettingsFieldsEntity);
    const data = await (await repository.delete(id)).affected;
    orm.destroy();
    return {
      message: 'SettingsFields deleted successfully',
      data: {
        affected: data,
      },
    };
  }
}
