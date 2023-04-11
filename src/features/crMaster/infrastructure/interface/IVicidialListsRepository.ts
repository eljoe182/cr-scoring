import { VicidialLists } from '@shared/infrastructure/persistance/entities/CRMaster/FRVicidialLists.entity';

export interface IVicidialListsRepository {
  getVicidialLists(): Promise<VicidialLists[]>;
}
