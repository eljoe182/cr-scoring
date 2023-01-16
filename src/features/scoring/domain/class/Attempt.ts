import { AttemptContract } from '../contracts/Attempts.contract';

export abstract class Attempt {
  // Get beast attempt return object with key and value
  static getBestAttempt(attempts: AttemptContract): string {
    const attemptsArray = Object.entries(attempts);
    return attemptsArray.reduce((a, b) => (a[1] > b[1] ? a : b))[0];
  }
}
