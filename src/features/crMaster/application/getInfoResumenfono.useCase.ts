import { Resumenfono } from '@shared/domain/entities/CRMaster/Resumenfono.entity';
import { IGetInfoResumenfonoUseCase } from '../domain/interface/IGetInfoResumenfonoUseCase';
import { IResumenfonoRepository } from '../domain/interface/IResumenfonoRepository';

export default class GetInfoResumenfonoUseCase implements IGetInfoResumenfonoUseCase {

  constructor(private repository: IResumenfonoRepository) {}

  async execute(phoneNumber: string): Promise<Resumenfono> {
    return await this.repository.getInfoResumenfono(phoneNumber);
  }
}
