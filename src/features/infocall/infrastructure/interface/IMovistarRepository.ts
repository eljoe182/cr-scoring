import { Movistar } from '@shared/infrastructure/persistance/entities/Infocall';
import { CellProviderTable } from '@feat/infocall/domain/contracts/CellProviderTable';

export interface IMovistarRepository {
  getByNumber(phoneNumber: number): Promise<Movistar>;
  getFields(): Promise<CellProviderTable[]>;
  getInByPhoneNumber(phoneNumbers: number[]): Promise<Movistar[]>;
  getDistinctByField(field: string): Promise<unknown>;
}
