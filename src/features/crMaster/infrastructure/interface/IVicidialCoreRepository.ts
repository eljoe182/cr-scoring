import { FRVicidialList, FRVicidialList1121, FRVicidialList2121 } from '@shared/infrastructure/persistance/entities/CRMaster';

export interface IVicidialCoreRepository {
  getInfo(listId: number): Promise<FRVicidialList[] | FRVicidialList1121[] | FRVicidialList2121[]>;
}
