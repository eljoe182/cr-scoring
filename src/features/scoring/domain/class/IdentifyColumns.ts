import { getMetadataArgsStorage, ColumnType } from 'typeorm';
import { TableMetadataArgs } from 'typeorm/metadata-args/TableMetadataArgs';
import { EvaluationResult } from '../contracts';
import { SettingsFields } from 'src/shared/infrastructure/persistance/entities';

function setType(value: ColumnType, valueCondition: string) {
  if (['number', 'decimal', 'float', 'double', 'int', 'integer', 'smallint', 'bigint'].includes(value.toString())) {
    return Number(valueCondition);
  }
  if (['boolean', 'bool'].includes(value.toString())) {
    return Boolean(valueCondition);
  }
  if (['tinyint'].includes(value.toString())) {
    return Boolean(Number(valueCondition));
  }
  if (['date', 'datetime', 'timestamp'].includes(value.toString())) {
    return new Date(valueCondition);
  }
  return valueCondition;
}

export class IdentifyColumns {
  static getValues(data: SettingsFields[]): EvaluationResult[] {
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
        valueCondition: setType(columnInfo?.options.type || 'string', config.valueCondition),
        valueScore: Number(config.valueScore),
        alias: columnInfo?.propertyName || '',
        columnName: columnInfo?.options.name || '',
        columnType: columnInfo?.options.type?.toString() || '',
      };
    });
  }
}
