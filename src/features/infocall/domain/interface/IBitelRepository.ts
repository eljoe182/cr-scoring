import { Bitel } from '@shared/domain/entities/Infocall/bitel';

export interface IBitelRepository {
  getByNumber(phoneNumber: number): Promise<Bitel>;
}
