import { Claro } from '../../../../shared/infrastructure/persistance/entities';
import { CellProviderTable } from '../../../../features/infocall/domain/contracts';

export interface IClaroRepository {
  getByNumber(phoneNumber: number): Promise<Claro>;
  getFields(): Promise<CellProviderTable[]>;
  getInByPhoneNumber(phoneNumbers: number[]): Promise<Claro[]>;
  getDistinctByField(field: string): Promise<unknown>;
}
