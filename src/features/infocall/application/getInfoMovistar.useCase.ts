import { IGetInfoMovistarUseCase } from '../domain/interface/IGetInfoMovistarUseCase';
import { IMovistarRepository } from '../infrastructure/interface/IMovistarRepository';

export default class GetInfoMovistarUseCase implements IGetInfoMovistarUseCase {
  constructor(private repository: IMovistarRepository) {}

  async execute(phoneNumber: number) {
    return await this.repository.getByNumber(phoneNumber);
  }
}
