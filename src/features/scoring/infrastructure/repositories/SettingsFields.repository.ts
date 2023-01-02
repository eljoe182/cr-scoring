import { DataSource } from 'typeorm';
import { ISettingsFieldsRepository } from '../interface/ISettingsFieldsRepository';
import { FieldConfig } from '@feat/infocall/domain/contracts/FieldConfig';
import { SettingsFields } from '@shared/domain/entities/Scoring/SettingsFields.entity';

export default class SettingsFieldsRepository implements ISettingsFieldsRepository {
  constructor(private orm: DataSource) {}
  async saveSettingsFields(fieldsConfig: FieldConfig): Promise<unknown> {
    const orm = await this.orm.initialize();
    const repository = orm.manager.getRepository(SettingsFields);
    const data = repository.create({
      database: fieldsConfig.database,
      tableName: fieldsConfig.table,
      field: fieldsConfig.field,
      value: fieldsConfig.value,
    })
    return repository.save(data);
  }
}
