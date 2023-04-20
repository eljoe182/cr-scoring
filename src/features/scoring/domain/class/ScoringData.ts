import { Scoring } from 'src/shared/infrastructure/persistance/entities';

export default class ScoringData implements Scoring {
  phoneNumber: number;
  operator: string;
  score: number;
  beastDate: Date;
  betterManagement: string;
  beastTry: string;
  withWhatsapp: boolean;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
  constructor(data: Scoring) {
    this.phoneNumber = data.phoneNumber;
    this.operator = data.operator;
    this.score = data.score;
    this.beastDate = data.beastDate;
    this.betterManagement = data.betterManagement;
    this.beastTry = data.beastTry;
    this.withWhatsapp = data.withWhatsapp;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  toPrimitive(): Scoring {
    return {
      phoneNumber: Number(this.phoneNumber),
      operator: this.operator,
      score: this.score,
      beastDate: new Date(this.beastDate),
      betterManagement: this.betterManagement,
      beastTry: this.beastTry,
      withWhatsapp: Boolean(this.withWhatsapp),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
