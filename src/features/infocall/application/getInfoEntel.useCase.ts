import { IGetInfoEntelUseCase } from '../domain/interface/IGetInfoEntelUseCase';
import { IEntelRepository } from '../infrastructure/interface/IEntelRepository';

export default class GetInfoEntelUseCase implements IGetInfoEntelUseCase {
  constructor(private repository: IEntelRepository) {}

  async execute(phoneNumber: number) {
    return await this.repository.getByNumber(phoneNumber);
  }
}
