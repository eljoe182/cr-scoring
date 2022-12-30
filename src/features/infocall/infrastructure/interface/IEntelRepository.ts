import { Entel } from '@shared/domain/entities/Infocall';
import { CellProviderTable } from '@feat/infocall/domain/contracts/CellProviderTable';

export interface IEntelRepository {
  getByNumber(phoneNumber: number): Promise<Entel>;
  getFields(): Promise<CellProviderTable[]>;
}
