import { VicidialLists } from '../../../../shared/infrastructure/persistance/entities';

export interface IVicidialListsRepository {
  getVicidialLists(): Promise<VicidialLists[]>;
}
