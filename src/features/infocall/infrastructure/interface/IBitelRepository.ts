import { BitelEntity } from '@shared/infrastructure/persistance/entities/Bitel.entity';
import { CellProviderTable } from '@feat/infocall/domain/contracts/CellProviderTable';

export interface IBitelRepository {
  getByNumber(phoneNumber: number): Promise<BitelEntity>;
  getFields(): Promise<CellProviderTable[]>;
  getInByPhoneNumber(phoneNumbers: number[]): Promise<BitelEntity[]>;
  getDistinctByField(field: string): Promise<unknown>;
}
