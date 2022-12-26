import { DataSource } from 'typeorm';
import { IClaroRepository } from '@feat/infocall/infrastructure/interface/IClaroRepository';
import { Claro } from '@shared/domain/entities/Infocall';

export default class ClaroRepository implements IClaroRepository {
  constructor(private orm: DataSource) {}

  async getByNumber(phoneNumber: number): Promise<Claro> {
    const orm = await this.orm.initialize();
    const repository = orm.manager.getRepository(Claro);
    return repository.findOneBy({ phoneNumber }) as unknown as Claro;
  }
}
