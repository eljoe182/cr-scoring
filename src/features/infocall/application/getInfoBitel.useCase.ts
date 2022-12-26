import { IBitelRepository } from "../domain/interface/IBitelRepository";

export default class GetInfoBitelUseCase {
  constructor(private repository: IBitelRepository) {}

  async execute(phoneNumber: number) {
    return await this.repository.getByNumber(phoneNumber);
  }
}