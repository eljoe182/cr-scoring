import { VicidialLists } from '@shared/domain/entities/CRMaster/FRVicidialLists.entity';

export interface IVicidialListsRepository {
  getVicidialLists(): Promise<VicidialLists[]>;
}
