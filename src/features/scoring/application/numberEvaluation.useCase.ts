import { getMetadataArgsStorage } from 'typeorm';
import { IBaseUseCase } from '../../../shared/domain/BaseUseCase';
import { ParamsNumberEvaluationContract } from '../domain/contracts/NumberEvaluation.contract';
import { TableMetadataArgs } from 'typeorm/metadata-args/TableMetadataArgs';
// import { BitelEntity } from '../../../shared/infrastructure/persistance/entities';

interface ResultInfoCall {
  campaign: string;
  condition: string;
  database: string;
  field: string;
  tableName: string;
  valueCondition: string;
  valueScore: string;
  alias: string | undefined;
  columnName: string | undefined;
  columnType: string | undefined;
}

export default class NumberEvaluationUseCase implements IBaseUseCase {
  async execute(params: ParamsNumberEvaluationContract): Promise<unknown> {
    return new Promise((resolve) => {
      const {
        dataPeriod: { info, operator },
        fields,
      } = params;
      let score = 0;

      const infoCallFields = fields?.filter((item) => item.database === 'infocall');
      // management operations

      const resultInfoCall: ResultInfoCall[] = [];
      if (infoCallFields) {
        infoCallFields.forEach((config) => {
          const tableInfo: TableMetadataArgs = getMetadataArgsStorage().tables.find(
            (table) => table.name === config.tableName
          ) as TableMetadataArgs;
          const columnInfo = getMetadataArgsStorage()
            .columns.filter((column) => column.target === tableInfo?.target)
            .find((column) => column.options.name === config.field);

          resultInfoCall.push({
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
          });
        });
      }

      const entries = Object.entries(operator);

      entries.forEach((item) => {
        const [key, value] = item;

        const field = resultInfoCall.find((item) => item.alias === key);
        if (field) {
          if (field.condition === '=' && value === field.valueCondition) {
            score = score + Number(field.valueScore);
          }

          if (field.condition === '<>' && value !== field.valueCondition) {
            score = score + Number(field.valueScore);
          }

          if (field.condition === '<' && value < field.valueCondition) {
            score = score + Number(field.valueScore);
          }

          if (field.condition === '<=' && value <= field.valueCondition) {
            score = score + Number(field.valueScore);
          }

          if (field.condition === '>' && value > field.valueCondition) {
            score = score + Number(field.valueScore);
          }

          if (field.condition === '>=' && value >= field.valueCondition) {
            score = score + Number(field.valueScore);
          }
        }
      });

      // operator operations
      const crMasterFields = fields?.filter((item) => item.database === 'BD_CR_MAESTRA');

      const resultCrMaster: ResultInfoCall[] = [];
      if (crMasterFields) {
        crMasterFields.forEach((config) => {
          const tableInfo: TableMetadataArgs = getMetadataArgsStorage().tables.find(
            (table) => table.name === config.tableName
          ) as TableMetadataArgs;
          const columnInfo = getMetadataArgsStorage()
            .columns.filter((column) => column.target === tableInfo?.target)
            .find((column) => column.options.name === config.field);

          resultCrMaster.push({
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
          });
        });
      }

      resolve({
        phoneNumber: info.phoneNumber,
        score,
        betterManagement: info.betterManagement,
        beastTry: 0,
        withWhatsapp: operator.withWhatsapp,
      });
    });
  }
}
