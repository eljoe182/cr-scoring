import { IResumenfonoRepository } from '@feat/crMaster/infrastructure/interface/IResumenfonoRepository';
import { IBaseUseCase } from '@shared/domain/BaseUseCase';
import { IBitelRepository } from '@feat/infocall/infrastructure/interface/IBitelRepository';
import { IClaroRepository } from '@feat/infocall/infrastructure/interface/IClaroRepository';
import { IEntelRepository } from '@feat/infocall/infrastructure/interface/IEntelRepository';
import { IMovistarRepository } from '@feat/infocall/infrastructure/interface/IMovistarRepository';
import { CellProviderTable } from '@feat/infocall/domain/contracts/CellProviderTable';
import { DataSourceDependency as dsContainer } from '@app/dependencyInjection';

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

    return resultFields
  }
}
