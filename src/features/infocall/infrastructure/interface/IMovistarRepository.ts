import { Movistar } from '@shared/domain/entities/Infocall';

export interface IMovistarRepository {
  getByNumber(phoneNumber: number): Promise<Movistar>;
}
