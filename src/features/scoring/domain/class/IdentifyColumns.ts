import { getMetadataArgsStorage } from 'typeorm';
import { TableMetadataArgs } from 'typeorm/metadata-args/TableMetadataArgs';
import { ResultInfoCall } from '../contracts';
import { SettingsFields } from 'src/shared/infrastructure/persistance/entities';

export class IdentifyColumns {
  static getValues(data: SettingsFields[]): ResultInfoCall[] {
    return data.map((config) => {
      const tableInfo: TableMetadataArgs = getMetadataArgsStorage().tables.find(
        (table) => table.name === config.tableName
      ) as TableMetadataArgs;
      const columnInfo = getMetadataArgsStorage()
        .columns.filter((column) => column.target === tableInfo?.target)
        .find((column) => column.options.name === config.field);

      return {
        campaign: config.campaign,
        condition: config.condition,
        database: config.database,
        field: config.field,
        tableName: config.tableName,
        valueCondition: config.valueCondition,
        valueScore: config.valueScore,
        columnName: columnInfo?.options.name,
        alias: columnInfo?.propertyName,
        columnType: columnInfo?.options.type?.toString(),
      };
    });
  }
}
