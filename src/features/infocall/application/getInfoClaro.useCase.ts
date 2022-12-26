import { IClaroRepository } from '../domain/interface/IClaroRepository';

export default class GetInfoClaroUseCase {
  constructor(private repository: IClaroRepository) {}

  async execute(phoneNumber: number) {
    return await this.repository.getByNumber(phoneNumber);
  }
}
