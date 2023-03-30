import { IBaseUseCase } from '@shared/domain/BaseUseCase';
import { IBitelRepository } from '../../infocall/infrastructure/interface/IBitelRepository';
import container from '@shared/infrastructure/dependency';
import { IParamsDistinctValues } from '../domain/interface/IParamsDistinctValues';
import { IEntelRepository } from '@feat/infocall/infrastructure/interface/IEntelRepository';
import { IClaroRepository } from '@feat/infocall/infrastructure/interface/IClaroRepository';
import { IMovistarRepository } from '@feat/infocall/infrastructure/interface/IMovistarRepository';
import { IResumenfonoRepository } from '@feat/crMaster/infrastructure/interface/IResumenfonoRepository';

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
