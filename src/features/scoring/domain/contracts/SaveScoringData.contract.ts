export interface SaveScoringDataContract {
  phoneNumber: string;
  operator: string;
  score: number;
  beastDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}