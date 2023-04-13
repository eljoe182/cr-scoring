import { IBaseUseCase } from '../../../shared/domain/BaseUseCase';
import { Resumenfono } from '../../../shared/infrastructure/persistance/entities';
import { IResumenfonoRepository } from '../infrastructure/interface';

export default class GetInfoResumenfonoUseCase implements IBaseUseCase {

  constructor(private repository: IResumenfonoRepository) {}

  async execute(phoneNumber: string): Promise<Resumenfono> {
    return await this.repository.getInfoResumenfono(phoneNumber);
  }
}
