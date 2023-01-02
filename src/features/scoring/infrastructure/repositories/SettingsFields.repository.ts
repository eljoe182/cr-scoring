import { DataSource } from 'typeorm';
import { ISettingsFieldsRepository } from '../interface/ISettingsFieldsRepository';
import { FieldConfig } from '@feat/infocall/domain/contracts/FieldConfig';
import { SettingsFields } from '@shared/domain/entities/Scoring/SettingsFields.entity';
import { IResponseRepository } from '@shared/domain/contracts/ResponseRepository.contracts';

export default class SettingsFieldsRepository implements ISettingsFieldsRepository {
  constructor(private orm: DataSource) {}
  async saveSettingsFields(fieldsConfig: FieldConfig): Promise<IResponseRepository> {
    const orm = await this.orm.initialize();
    const repository = orm.manager.getRepository(SettingsFields);
    const data = repository.create({
      database: fieldsConfig.database,
      tableName: fieldsConfig.table,
      field: fieldsConfig.field,
      value: fieldsConfig.value,
    });

    const result = await repository.save(data);

    return {
      message: 'SettingsFields saved successfully',
      data: result,
    };
  }

  async getSettingsFields(): Promise<IResponseRepository> {
    const orm = await this.orm.initialize();
    const repository = orm.manager.getRepository(SettingsFields);
    const data = await repository.find();
    return {
      message: 'SettingsFields fetched successfully',
      data,
    };
  }

  async destroySettingsFields(id: string): Promise<IResponseRepository> {
    const orm = await this.orm.initialize();
    const repository = orm.manager.getRepository(SettingsFields);
    const data = await (await repository.delete(id)).affected;
    return {
      message: 'SettingsFields deleted successfully',
      data: {
        affected: data,
      },
    };
  }
}
