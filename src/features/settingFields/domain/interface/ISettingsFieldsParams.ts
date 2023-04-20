import { IPagination } from "src/shared/infrastructure/interfaces";

export interface GetSettingsFieldsUseCaseParams extends IPagination {
  campaign: string;
}
