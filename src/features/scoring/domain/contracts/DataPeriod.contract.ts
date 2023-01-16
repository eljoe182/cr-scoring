import { Resumenfono } from '@shared/domain/entities/CRMaster';
import { Bitel, Claro, Entel, Movistar } from '@shared/domain/entities/Infocall';

export interface DataPeriodContract {
  info: Resumenfono;
  operator: Bitel | Claro | Entel | Movistar;
}
