import { FRVicidialList } from 'src/shared/infrastructure/persistance/entities';

export interface GetInfoVicidialDataContract {
  listId: number;
  leadId: number;
  vendorLeadCode: string;
  sourceId: string;
  phoneNumber: string;
  operator?: string;
  score?: number;
  beastDate?: Date;
  betterManagement?: string;
  beastTry?: string;
  withWhatsapp?: boolean;
  rank?: number;
}

export type GetInfoVicidialUseCaseResponse = FRVicidialList;
