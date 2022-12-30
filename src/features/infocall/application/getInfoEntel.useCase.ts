import { IBaseUseCase } from '@shared/domain/BaseUseCase';
import { IEntelRepository } from '../infrastructure/interface/IEntelRepository';

export default class GetInfoEntelUseCase implements IBaseUseCase {
  constructor(private repository: IEntelRepository) {}

  async execute(phoneNumber: number) {
    return await this.repository.getByNumber(phoneNumber);
  }
}
