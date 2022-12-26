export interface IEntelRepository {
  getByNumber(phoneNumber: number): Promise<unknown>;
}
