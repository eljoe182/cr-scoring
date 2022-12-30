import { Movistar } from '@shared/domain/entities/Infocall';
import { CellProviderTable } from '@feat/infocall/domain/contracts/CellProviderTable';

export interface IMovistarRepository {
  getByNumber(phoneNumber: number): Promise<Movistar>;
  getFields(): Promise<CellProviderTable[]>;
}
