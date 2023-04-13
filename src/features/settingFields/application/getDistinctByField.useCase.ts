import container from 'src/shared/infrastructure/dependency';
import { IBaseUseCase } from 'src/shared/domain';
import {
  IBitelRepository,
  IEntelRepository,
  IClaroRepository,
  IMovistarRepository,
} from '../../infocall/infrastructure/interface';
import { IParamsDistinctValues } from '../../scoring/domain/interface';
import { IResumenfonoRepository } from 'src/features/crMaster/infrastructure/interface';

export default class GetDistinctByFieldUseCase implements IBaseUseCase {
  private bitelRepository: IBitelRepository = container.get('Bitel.Repository');
  private entelRepository: IEntelRepository = container.get('Entel.Repository');
  private claroRepository: IClaroRepository = container.get('Claro.Repository');
  private movistarRepository: IMovistarRepository = container.get('Movistar.Repository');
  private resumenfonoRepository: IResumenfonoRepository = container.get('Resumenfono.Repository');

  async execute(params: IParamsDistinctValues): Promise<unknown> {
    if (params.table === 'bitel') return this.bitelRepository.getDistinctByField(params.field);
    if (params.table === 'entel') return this.entelRepository.getDistinctByField(params.field);
    if (params.table === 'claro') return this.claroRepository.getDistinctByField(params.field);
    if (params.table === 'movistar') return this.movistarRepository.getDistinctByField(params.field);
    if (params.table === 'RS_OP_FG_RESUMENFONO') return this.resumenfonoRepository.getDistinctByField(params.field);

    return null;
  }
}
