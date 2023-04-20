import { FRVicidialList } from 'src/shared/infrastructure/persistance/entities';

export interface ResultScoringResponse extends FRVicidialList {
  operator: string;
  score: number;
  beastDate: Date;
  betterManagement: string;
  beastTry: string;
  withWhatsapp: boolean;
}
