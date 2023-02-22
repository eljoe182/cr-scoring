import { Resumenfono } from '@shared/domain/entities/CRMaster/Resumenfono.entity';
import { IResumenfonoRepository } from '../infrastructure/interface/IResumenfonoRepository';
import { IBaseUseCase } from '@shared/domain/BaseUseCase';

export default class GetInfoResumenfonoUseCase implements IBaseUseCase {

  constructor(private repository: IResumenfonoRepository) {}

  async execute(phoneNumber: string): Promise<Resumenfono> {
    return await this.repository.getInfoResumenfono(phoneNumber);
  }
}
