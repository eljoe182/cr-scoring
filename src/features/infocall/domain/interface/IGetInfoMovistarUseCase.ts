import { Movistar } from '@shared/domain/entities/Infocall';

export interface IGetInfoMovistarUseCase {
  execute(phoneNumber: number): Promise<Movistar>;
}
