import { IBaseUseCase } from '../../../shared/domain/BaseUseCase';
import { ResumenfonoEntity } from '../../../shared/infrastructure/persistance/entities/Resumenfono.entity';
import { IResumenfonoRepository } from '../infrastructure/interface/IResumenfonoRepository';

export default class GetInfoResumenfonoUseCase implements IBaseUseCase {

  constructor(private repository: IResumenfonoRepository) {}

  async execute(phoneNumber: string): Promise<ResumenfonoEntity> {
    return await this.repository.getInfoResumenfono(phoneNumber);
  }
}
