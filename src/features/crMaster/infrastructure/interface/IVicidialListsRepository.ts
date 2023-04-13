import { VicidialLists } from 'src/shared/infrastructure/persistance/entities';

export interface IVicidialListsRepository {
  getVicidialLists(): Promise<VicidialLists[]>;
}
