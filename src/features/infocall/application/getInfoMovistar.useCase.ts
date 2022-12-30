import { IBaseUseCase } from '@shared/domain/BaseUseCase';
import { IMovistarRepository } from '../infrastructure/interface/IMovistarRepository';

export default class GetInfoMovistarUseCase implements IBaseUseCase {
  constructor(private repository: IMovistarRepository) {}

  async execute(phoneNumber: number) {
    return await this.repository.getByNumber(phoneNumber);
  }
}
