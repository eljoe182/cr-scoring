import { DataSource } from 'typeorm';
import { ISettingsFieldsRepository } from '../interface/ISettingsFieldsRepository';
import { FieldConfig } from '@feat/infocall/domain/contracts/FieldConfig';
import { SettingsFields } from '@shared/domain/entities/Scoring/SettingsFields.entity';
import { ResponseRepositoryContract } from '@shared/domain/contracts/ResponseRepository.contracts';
import { IPagination } from '@feat/scoring/domain/interface/IPagination';
import { IResultPagination } from '@feat/scoring/domain/interface/IResultPagination';

export default class SettingsFieldsRepository implements ISettingsFieldsRepository {
  constructor(private orm: DataSource) {}
  async save(fieldsConfig: FieldConfig): Promise<ResponseRepositoryContract> {
    const orm = await this.orm.initialize();
    const repository = orm.manager.getRepository(SettingsFields);
    const data = repository.create({
      database: fieldsConfig.database,
      tableName: fieldsConfig.table,
      field: fieldsConfig.field,
      value: fieldsConfig.value,
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
    const repository = orm.manager.getRepository(SettingsFields);
    const result = await repository.find();
    orm.destroy();
    return {
      message: 'SettingsFields found successfully',
      data: result,
    };
  }

  async getAllWithPagination(pagination: IPagination): Promise<IResultPagination> {
    const orm = await this.orm.initialize();
    const repository = orm.manager.getRepository(SettingsFields);
    const [rows, rowsCount] = await repository.findAndCount({
      take: pagination.limit,
      skip: pagination.limit * (pagination.page - 1),
      order: {
        database: 'ASC',
        tableName: 'ASC',
        value: 'DESC',
      },
    });
    orm.destroy();
    return {
      page: pagination.page,
      limit: pagination.limit,
      rowsCount,
      rows,
    };
  }

  async destroy(id: string): Promise<ResponseRepositoryContract> {
    const orm = await this.orm.initialize();
    const repository = orm.manager.getRepository(SettingsFields);
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
