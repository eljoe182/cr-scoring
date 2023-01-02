import { Bitel } from '@shared/domain/entities/Infocall/Bitel.entity';
import { CellProviderTable } from '@feat/infocall/domain/contracts/CellProviderTable';

export interface IBitelRepository {
  getByNumber(phoneNumber: number): Promise<Bitel>;
  getFields(): Promise<CellProviderTable[]>;
}
