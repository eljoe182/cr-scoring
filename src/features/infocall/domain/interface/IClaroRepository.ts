import { Claro } from '@shared/domain/entities/Infocall';

export interface IClaroRepository {
  getByNumber(phoneNumber: number): Promise<Claro>;
}
