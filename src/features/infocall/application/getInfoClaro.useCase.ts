import { IGetInfoClaroUseCase } from '../domain/interface/IGetInfoClaroUseCase';
import { IClaroRepository } from '../infrastructure/interface/IClaroRepository';

export default class GetInfoClaroUseCase implements IGetInfoClaroUseCase {
  constructor(private repository: IClaroRepository) {}

  async execute(phoneNumber: number) {
    return await this.repository.getByNumber(phoneNumber);
  }
}
