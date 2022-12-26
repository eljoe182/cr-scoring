import { DataSource } from 'typeorm';
import { IEntelRepository } from '../interface/IEntelRepository';
import { Entel } from '@shared/domain/entities/Infocall';

export default class EntelRepository implements IEntelRepository {
  constructor(private orm: DataSource) {}

  async getByNumber(phoneNumber: number): Promise<Entel> {
    const orm = await this.orm.initialize();
    const repository = orm.manager.getRepository(Entel);
    return repository.findOneBy({ phoneNumber }) as unknown as Entel;
  }
}
