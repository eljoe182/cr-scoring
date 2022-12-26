import { Resumenfono } from '@shared/domain/entities/CRMaster/Resumenfono.entity';
import { IResumenfonoRepository } from '@feat/crMaster/domain/interface/IResumenfonoRepository';
import { DataSource } from 'typeorm';

export default class ResumenfonoRepository implements IResumenfonoRepository {
  constructor(private orm: DataSource) {}

  public async getInfoResumenfono(period: string) {
    const orm = await this.orm.initialize();
    const repository = orm.manager.getRepository(Resumenfono);
    return repository.find({ where: { period }, take: 10 });
  }
}
