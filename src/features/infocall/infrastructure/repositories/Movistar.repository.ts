import { DataSource } from 'typeorm';
import { IMovistarRepository } from '../interface/IMovistarRepository';
import { Movistar } from '@shared/domain/entities/Infocall';

export default class MovistarRepository implements IMovistarRepository {
  constructor(private orm: DataSource) {}

  async getByNumber(phoneNumber: number): Promise<Movistar> {
    const orm = await this.orm.initialize();
    const repository = orm.manager.getRepository(Movistar);
    return repository.findOneBy({ phoneNumber }) as unknown as Movistar;
  }
}
