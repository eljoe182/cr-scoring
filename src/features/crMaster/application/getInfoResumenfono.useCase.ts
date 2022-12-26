import { Params } from '@shared/domain/contracts/Params.contract'
import { Resumenfono } from '@shared/domain/entities/CRMaster/Resumenfono.entity';
import { IResumenfonoRepository } from '../domain/interface/IResumenfonoRepository';

export default class GetInfoResumenfonoUseCase {

  constructor(private repository: IResumenfonoRepository) {}

  async execute(params: Params): Promise<Resumenfono[]> {
    return await this.repository.getInfoResumenfono(params.period);
  }
}
