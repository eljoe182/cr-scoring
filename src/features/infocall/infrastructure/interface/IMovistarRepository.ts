import { Movistar } from '../../../../shared/infrastructure/persistance/entities';
import { CellProviderTable } from '../../../../features/infocall/domain/contracts';

export interface IMovistarRepository {
  getByNumber(phoneNumber: number): Promise<Movistar>;
  getFields(): Promise<CellProviderTable[]>;
  getInByPhoneNumber(phoneNumbers: number[]): Promise<Movistar[]>;
  getDistinctByField(field: string): Promise<unknown>;
}
