import { IBaseUseCase } from "@shared/domain/BaseUseCase";
import { ISettingsFieldsRepository } from "../infrastructure/interface/ISettingsFieldsRepository";

export default class GetSettingsFieldsUseCase implements IBaseUseCase {
  constructor(private readonly repository: ISettingsFieldsRepository) {}
  async execute() {
    return this.repository.getSettingsFields();
  }
}