import { IGetInfoBitelUseCase } from '../domain/interface/IGetInfoBitelUseCase';
import { IBitelRepository } from '../infrastructure/interface/IBitelRepository';

export default class GetInfoBitelUseCase implements IGetInfoBitelUseCase {
  constructor(private repository: IBitelRepository) {}

  async execute(phoneNumber: number) {
    return await this.repository.getByNumber(phoneNumber);
  }
}
