export interface IResumenfonoRepository<P = unknown, R = unknown> {
  getInfoResumenfono(phoneNumber: P): Promise<R>;
  getByPeriod(period: P): Promise<R>;
  getFields(): Promise<unknown>;
  getInByPhoneNumber(phoneNumbers: P[]): Promise<R>;
  getDistinctByField(field: P): Promise<unknown>;
}
