import {
  FRVicidialList
} from '../../../../shared/infrastructure/persistance/entities';

export interface IVicidialCoreRepository {
  getInfo(listId: number): Promise<FRVicidialList[]>;
}
