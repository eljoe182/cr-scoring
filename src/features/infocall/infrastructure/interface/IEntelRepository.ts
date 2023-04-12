import { Entel } from '@shared/infrastructure/persistance/entities';
import { CellProviderTable } from '@feat/infocall/domain/contracts/CellProviderTable';

export interface IEntelRepository {
  getByNumber(phoneNumber: number): Promise<Entel>;
  getFields(): Promise<CellProviderTable[]>;
  getInByPhoneNumber(phoneNumbers: number[]): Promise<Entel[]>;
  getDistinctByField(field: string): Promise<unknown>;
}
