import { Entel } from '@shared/domain/entities/Infocall';

export interface IEntelRepository {
  getByNumber(phoneNumber: number): Promise<Entel>;
}
