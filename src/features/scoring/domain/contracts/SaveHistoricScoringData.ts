export interface SaveHistoricScoringData {
  phoneNumber: string;
  operator: string;
  score: number;
  beastDate: Date;
  withWhatsapp: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}