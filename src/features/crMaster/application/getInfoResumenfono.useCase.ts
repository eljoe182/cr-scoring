import { IBaseUseCase } from 'src/shared/domain/BaseUseCase';
import { Resumenfono } from 'src/shared/infrastructure/persistance/entities';
import { IResumenfonoRepository } from '../infrastructure/interface';

export default class GetInfoResumenfonoUseCase implements IBaseUseCase {

  constructor(private repository: IResumenfonoRepository) {}

  async execute(phoneNumber: string): Promise<Resumenfono> {
    return await this.repository.getInfoResumenfono(phoneNumber);
  }
}
