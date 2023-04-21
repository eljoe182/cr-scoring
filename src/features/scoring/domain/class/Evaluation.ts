import { ResultInfoCall } from '../contracts';

export interface EvaluationParams {
  score: number;
  entries: [string, string][];
  data: ResultInfoCall[];
}

export class Evaluation {
  static getScore(params: EvaluationParams): number {
    let score = 0;
    params.entries.forEach((item) => {
      const { 0: key, 1: value } = item;

      const field = params.data.find((item) => item.alias === key);
      if (field?.condition === '=' && String(value) === field?.valueCondition) {
        score += Number(`${field.valueScore}`);
      }

      if (field?.condition === '<>' && String(value) !== field?.valueCondition) {
        score += Number(`${field.valueScore}`);
      }

      if (field?.condition === '<' && String(value) < field?.valueCondition) {
        score += Number(`${field.valueScore}`);
      }

      if (field?.condition === '<=' && String(value) <= field?.valueCondition) {
        score += Number(`${field.valueScore}`);
      }

      if (field?.condition === '>' && String(value) > field?.valueCondition) {
        score += Number(`${field.valueScore}`);
      }

      if (field?.condition === '>=' && String(value) >= field?.valueCondition) {
        score += Number(`${field.valueScore}`);
      }
    });
    return score;
  }
}
