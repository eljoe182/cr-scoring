export interface OperatorRepositoryBase<P = unknown, R = unknown> {
  getByNumber(phoneNumber: P): Promise<R>;
  getFields(): Promise<R>;
  getInByPhoneNumber(phoneNumbers: P[]): Promise<R>;
  getDistinctByField(field: P): Promise<R>;
}
