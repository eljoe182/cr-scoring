import { DataSource } from 'typeorm';
import { Resumenfono } from '@shared/domain/entities/CRMaster/Resumenfono.entity';
import { IResumenfonoRepository } from '@feat/crMaster/domain/interface/IResumenfonoRepository';

export default class ResumenfonoRepository implements IResumenfonoRepository {
  constructor(private orm: DataSource) {}

  public async getInfoResumenfono(phoneNumber: string): Promise<Resumenfono> {
    const orm = await this.orm.initialize();
    const repository = orm.manager.getRepository(Resumenfono);
    return repository.findOneBy({ phoneNumber }) as unknown as Resumenfono;
  }
}
