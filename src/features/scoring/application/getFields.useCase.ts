import { IBaseUseCase } from 'src/shared/domain';
import { IResumenfonoRepository } from 'src/features/crMaster/infrastructure/interface/IResumenfonoRepository';
import {
  IBitelRepository,
  IClaroRepository,
  IEntelRepository,
  IMovistarRepository,
} from 'src/features/infocall/infrastructure/interface';
import { CellProviderTable } from 'src/features/infocall/domain/contracts';
import { DataSourceDependency as dsContainer } from 'src/app/dependencyInjection';

export default class GetFieldsUseCase implements IBaseUseCase {
  private redisRepository = dsContainer.get('DataSource.Redis.Repository');

  constructor(
    private readonly repositoryResumenfono: IResumenfonoRepository,
    private readonly repositoryBitel: IBitelRepository,
    private readonly repositoryClaro: IClaroRepository,
    private readonly repositoryEntel: IEntelRepository,
    private readonly repositoryMovistar: IMovistarRepository
  ) {}

  async execute() {
    const cache = await this.redisRepository.get('fields');
    if (cache) {
      const data = JSON.parse(cache);
      return data;
    }
    const fieldsResumenfono = (await this.repositoryResumenfono.getFields()) as unknown as { COLUMN_NAME: string }[];
    const fieldsBitel = (await this.repositoryBitel.getFields()) as unknown as CellProviderTable[];
    const fieldsClaro = (await this.repositoryClaro.getFields()) as unknown as CellProviderTable[];
    const fieldsEntel = (await this.repositoryEntel.getFields()) as unknown as CellProviderTable[];
    const fieldsMovistar = (await this.repositoryMovistar.getFields()) as unknown as CellProviderTable[];

    const resumenfono = fieldsResumenfono.map((field: { COLUMN_NAME: string }) => ({
      database: 'DB_CR_MAESTRA',
      table: 'RS_OP_FG_RESUMENFONO',
      field: field.COLUMN_NAME,
      value: 0,
    }));
    const bitel = fieldsBitel.map((field: CellProviderTable) => ({
      database: 'infocall',
      table: 'bitel',
      field: field.Field,
      value: 0,
    }));
    const claro = fieldsClaro.map((field: CellProviderTable) => ({
      database: 'infocall',
      table: 'claro',
      field: field.Field,
      value: 0,
    }));
    const entel = fieldsEntel.map((field: CellProviderTable) => ({
      database: 'infocall',
      table: 'entel',
      field: field.Field,
      value: 0,
    }));
    const movistar = fieldsMovistar.map((field: CellProviderTable) => ({
      database: 'infocall',
      table: 'movistar',
      field: field.Field,
      value: 0,
    }));

    const resultFields = Array.prototype.concat(resumenfono, bitel, claro, entel, movistar);

    await this.redisRepository.set('fields', JSON.stringify(resultFields));

    return resultFields;
  }
}
