import { Resumenfono } from '@shared/domain/entities/CRMaster/Resumenfono.entity';

export interface IGetInfoResumenfonoUseCase {
  execute(phoneNumber: string): Promise<Resumenfono>;
}
