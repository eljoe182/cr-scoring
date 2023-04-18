import { DataSource } from 'typeorm';
import { ISettingsFieldsRepository } from '../interface/ISettingsFieldsRepository';
import { FieldConfig } from 'src/features/infocall/domain/contracts';
import { SettingsFields, SettingsFieldsEntity } from 'src/shared/infrastructure/persistance/entities';
import { ResponseRepositoryContract } from 'src/shared/domain/contracts';
import { IResultPagination } from 'src/features/scoring/domain/interface';
import { GetSettingsFieldsUseCaseParams } from '../../domain/interface/ISettingsFieldsParams';

export default class SettingsFieldsRepository implements ISettingsFieldsRepository {
  constructor(private orm: DataSource) {}

  async save(fieldsConfig: FieldConfig): Promise<ResponseRepositoryContract> {
    const orm = await this.orm.initialize();
    const repository = orm.manager.getRepository(SettingsFieldsEntity);
    const data = repository.create({
      campaign: fieldsConfig.campaign,
      database: fieldsConfig.database,
      tableName: fieldsConfig.table,
      field: fieldsConfig.field,
      condition: fieldsConfig.condition,
      valueCondition: fieldsConfig.valueCondition,
      valueScore: fieldsConfig.valueScore,
    });

    const result = await repository.save(data);
    orm.destroy();
    return {
      message: 'SettingsFields saved successfully',
      data: result,
    };
  }

  async getAll(): Promise<ResponseRepositoryContract> {
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
      take: params.limit,
      skip: params.limit * (params.page - 1),
      order: {
        database: 'ASC',
        tableName: 'ASC',
        valueScore: 'DESC',
      },
    });
    orm.destroy();
    return {
      page: params.page,
      limit: params.limit,
      rowsCount,
      rows,
    };
  }

  async destroy(id: string): Promise<ResponseRepositoryContract> {
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
