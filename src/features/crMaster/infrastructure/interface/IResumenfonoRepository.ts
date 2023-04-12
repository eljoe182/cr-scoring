import { ResumenfonoEntity } from '../../../../shared/infrastructure/persistance/entities';

export interface IResumenfonoRepository {
  getInfoResumenfono(phoneNumber: string): Promise<ResumenfonoEntity>;
  getByPeriod(period: string): Promise<ResumenfonoEntity[]>;
  getFields(): Promise<unknown>;
  getInByPhoneNumber(phoneNumbers: string[]): Promise<ResumenfonoEntity[]>;
  getDistinctByField(field: string): Promise<unknown>;
}
