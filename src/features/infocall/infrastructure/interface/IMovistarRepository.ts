import { Movistar } from 'src/shared/infrastructure/persistance/entities';
import { CellProviderTable } from 'src/features/infocall/domain/contracts';

export interface IMovistarRepository {
  getByNumber(phoneNumber: number): Promise<Movistar>;
  getFields(): Promise<CellProviderTable[]>;
  getInByPhoneNumber(phoneNumbers: number[]): Promise<Movistar[]>;
  getDistinctByField(field: string): Promise<unknown>;
}
