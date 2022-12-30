import { IBaseUseCase } from '@shared/domain/BaseUseCase';
import { IClaroRepository } from '../infrastructure/interface/IClaroRepository';

export default class GetInfoClaroUseCase implements IBaseUseCase {
  constructor(private repository: IClaroRepository) {}

  async execute(phoneNumber: number) {
    return await this.repository.getByNumber(phoneNumber);
  }
}
