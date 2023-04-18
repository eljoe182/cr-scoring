import { ResultInfoCall } from '../contracts';

interface EvaluationParams {
  score: number;
  entries: [string, string][];
  data: ResultInfoCall[];
}

export class Evaluation {
  static getScore(params: EvaluationParams): number {
    let score = 0;
    params.entries.forEach((item) => {
      const [key, value] = item;

      const field = params.data.find((item) => item.alias === key);
      if (field) {
        if (field.condition === '=' && String(value) === field.valueCondition) {
          score = score + Number(field.valueScore);
        }

        if (field.condition === '<>' && String(value) !== field.valueCondition) {
          score = score + Number(field.valueScore);
        }

        if (field.condition === '<' && String(value) < field.valueCondition) {
          score = score + Number(field.valueScore);
        }

        if (field.condition === '<=' && String(value) <= field.valueCondition) {
          score = score + Number(field.valueScore);
        }

        if (field.condition === '>' && String(value) > field.valueCondition) {
          score = score + Number(field.valueScore);
        }

        if (field.condition === '>=' && String(value) >= field.valueCondition) {
          score = score + Number(field.valueScore);
        }
      }
    });
    return score;
  }
}
