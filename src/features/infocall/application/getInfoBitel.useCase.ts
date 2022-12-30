import { IBaseUseCase } from '@shared/domain/BaseUseCase';
import { IBitelRepository } from '../infrastructure/interface/IBitelRepository';

export default class GetInfoBitelUseCase implements IBaseUseCase {
  constructor(private repository: IBitelRepository) {}

  async execute(phoneNumber: number) {
    return this.repository.getByNumber(phoneNumber);
  }
}
