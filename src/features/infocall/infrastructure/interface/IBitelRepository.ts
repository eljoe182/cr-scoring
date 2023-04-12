import { Bitel } from '@shared/infrastructure/persistance/entities';
import { CellProviderTable } from '@feat/infocall/domain/contracts/CellProviderTable';

export interface IBitelRepository {
  getByNumber(phoneNumber: number): Promise<Bitel>;
  getFields(): Promise<CellProviderTable[]>;
  getInByPhoneNumber(phoneNumbers: number[]): Promise<Bitel[]>;
  getDistinctByField(field: string): Promise<unknown>;
}
