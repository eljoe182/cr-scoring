import { Claro } from '@shared/domain/entities/Infocall';
import { CellProviderTable } from '@feat/infocall/domain/contracts/CellProviderTable';

export interface IClaroRepository {
  getByNumber(phoneNumber: number): Promise<Claro>;
  getFields(): Promise<CellProviderTable[]>;
  getInByPhoneNumber(phoneNumbers: number[]): Promise<Claro[]>;
}
