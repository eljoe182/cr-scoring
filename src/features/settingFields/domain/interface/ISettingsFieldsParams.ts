import { IPagination } from '../../../scoring/domain/interface';

export interface GetSettingsFieldsUseCaseParams extends IPagination {
  campaign: string;
}
