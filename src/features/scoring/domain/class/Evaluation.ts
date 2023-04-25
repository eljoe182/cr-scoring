import { EvaluationResult } from '../contracts';

export interface EvaluationParams<T> {
  score: number;
  entries: [string, string | number | boolean | object | null][];
  data: T[];
  operator?: string;
}

function evaluate(value1: string, value2: string) {
  return value1.toLowerCase() === value2.toLowerCase();
}

export class Evaluation {
  static getScore(params: EvaluationParams<EvaluationResult>): number {
    let score = params.score;
    params.entries.forEach((item) => {
      const { 0: key, 1: value } = item;

      const fieldFilter = params.operator
        ? params.data.filter((op) => op.alias === key && op.tableName === params.operator)
        : params.data.filter((op) => op.alias === key);

      fieldFilter.forEach((field) => {
        switch (field?.condition) {
          case '=':
            if (evaluate(String(value).toLowerCase(), field?.valueCondition.toString().toLowerCase())) {
              score += Number(`${field.valueScore}`);
            }
            break;
          case '<>':
            if (evaluate(String(value).toLowerCase(), field?.valueCondition.toString().toLowerCase())) {
              score += Number(`${field.valueScore}`);
            }
            break;
          case '<=':
            if (evaluate(String(value).toLowerCase(), field?.valueCondition.toString().toLowerCase())) {
              score += Number(`${field.valueScore}`);
            }
            break;
          case '>=':
            if (evaluate(String(value).toLowerCase(), field?.valueCondition.toString().toLowerCase())) {
              score += Number(`${field.valueScore}`);
            }
            break;
          case '<':
            if (evaluate(String(value).toLowerCase(), field?.valueCondition.toString().toLowerCase())) {
              score += Number(`${field.valueScore}`);
            }
            break;
          case '>':
            if (evaluate(String(value).toLowerCase(), field?.valueCondition.toString().toLowerCase())) {
              score += Number(`${field.valueScore}`);
            }
            break;
        }
      });
    });
    return score;
  }
}
