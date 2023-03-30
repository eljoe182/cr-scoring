import { Resumenfono } from '@shared/domain/entities/CRMaster/Resumenfono.entity';

export interface IResumenfonoRepository {
  getInfoResumenfono(phoneNumber: string): Promise<Resumenfono>;
  getByPeriod(period: string): Promise<Resumenfono[]>;
  getFields(): Promise<unknown>;
  getInByPhoneNumber(phoneNumbers: string[]): Promise<Resumenfono[]>;
  getDistinctByField(field: string): Promise<unknown>;
}
