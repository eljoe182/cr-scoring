import { Bitel } from 'src/shared/infrastructure/persistance/entities';
import { CellProviderTable } from 'src/features/infocall/domain/contracts';

export interface IBitelRepository {
  getByNumber(phoneNumber: number): Promise<Bitel>;
  getFields(): Promise<CellProviderTable[]>;
  getInByPhoneNumber(phoneNumbers: number[]): Promise<Bitel[]>;
  getDistinctByField(field: string): Promise<unknown>;
}
