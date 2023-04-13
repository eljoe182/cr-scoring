import { Resumenfono } from '../../../../shared/infrastructure/persistance/entities';

export interface IResumenfonoRepository {
  getInfoResumenfono(phoneNumber: string): Promise<Resumenfono>;
  getByPeriod(period: string): Promise<Resumenfono[]>;
  getFields(): Promise<unknown>;
  getInByPhoneNumber(phoneNumbers: string[]): Promise<Resumenfono[]>;
  getDistinctByField(field: string): Promise<unknown>;
}
