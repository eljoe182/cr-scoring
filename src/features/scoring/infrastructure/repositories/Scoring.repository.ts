import { DataSource } from 'typeorm';
import { IScoringRepository } from '../interface';
import { Scoring, ScoringEntity } from 'src/shared/infrastructure/persistance/entities';
import { ResponseRepositoryBase } from 'src/shared/domain/contracts';

export default class ScoringRepository implements IScoringRepository {
  constructor(private orm: DataSource) {}

  async getScoring(phoneNumber: number): Promise<ResponseRepositoryBase<Scoring | null>> {
    const orm = await this.orm.initialize();
    const repository = orm.manager.getRepository(ScoringEntity);
    const data = await repository.findOne({
      where: {
        phoneNumber,
      },
    });
    orm.destroy();
    return {
      message: 'Scoring fetched successfully',
      data,
    };
  }

  async saveScoring(data: Scoring[]): Promise<ResponseRepositoryBase<unknown>> {
    const orm = await this.orm.initialize();
    const repository = orm.manager.getRepository(ScoringEntity);
    const result = await repository.upsert(data, ['phoneNumber']);
    orm.destroy();
    return {
      message: 'Scoring fetched successfully',
      data: result,
    };
  }

  async getInByPhoneNumber(phoneNumbers: number[]): Promise<ScoringEntity[]> {
    const orm = await this.orm.initialize();
    const repository = orm.manager.getRepository(ScoringEntity);
    const result = await repository
      .createQueryBuilder()
      .where('phone_number IN (:...phoneNumbers)', { phoneNumbers })
      .getMany();
    orm.destroy();
    return result;
  }
}
