import { AttemptContract } from '../contracts/Attempts.contract';

export class Attempt {
  constructor(private readonly attempts: AttemptContract) {}

  // Get beast attempt return object with key and value
  public getBestAttempt(): any {
    const attempts = this.attempts;
    const attemptsArray = Object.entries(attempts);
    const bestAttempt = attemptsArray.reduce((a, b) => (a[1] > b[1] ? a : b));
    return bestAttempt;
  }
}
