import { Scoring } from 'src/shared/infrastructure/persistance/entities';
import { GetScoringResult } from '../contracts';

export class SaveScoringData implements Scoring {
  phoneNumber: number;
  operator: string;
  score: number;
  beastDate: Date;
  betterManagement: string;
  beastTry: string;
  withWhatsapp: boolean;
  constructor(data: GetScoringResult) {
    this.phoneNumber = data.phoneNumber;
    this.operator = data.operator.operator;
    this.score = data.score;
    this.beastDate = new Date(data.betterManagementDate || 1);
    this.betterManagement = data.betterManagement;
    this.beastTry = data.betterAttempt;
    this.withWhatsapp = data.operator.withWhatsapp;
  }

  toSave(): Scoring {
    return {
      phoneNumber: this.phoneNumber,
      operator: this.operator,
      score: this.score,
      beastDate: this.beastDate,
      betterManagement: this.betterManagement,
      beastTry: this.beastTry,
      withWhatsapp: this.withWhatsapp,
    };
  }
}
