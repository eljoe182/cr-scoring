import { Resumenfono } from '@shared/domain/entities/CRMaster/Resumenfono.entity';

export interface IResumenfonoRepository {
  getInfoResumenfono(phoneNumber: string): Promise<Resumenfono>;
}
