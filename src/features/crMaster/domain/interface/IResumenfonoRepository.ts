import { Resumenfono } from '@shared/domain/entities/CRMaster/Resumenfono.entity';

export interface IResumenfonoRepository {
  getInfoResumenfono(params: unknown): Promise<Resumenfono[]>;
}
