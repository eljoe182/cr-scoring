import { DataSource } from 'typeorm';
import { IScoringRepository } from '../interface/IScoringRepository';
import { SaveScoringDataContract } from '@feat/scoring/domain/contracts/SaveScoringData.contract';
import { Scoring } from '@shared/domain/entities/Infocall';

export default class ScoringRepository implements IScoringRepository {
  constructor(private orm: DataSource) {}

  async getScoring(phoneNumber: string): Promise<unknown> {
    const orm = await this.orm.initialize();
    const repository = orm.manager.getRepository(Scoring);
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

  async saveScoring(data: SaveScoringDataContract[]): Promise<unknown> {
    const orm = await this.orm.initialize();
    const repository = orm.manager.getRepository(Scoring);
    const result = await repository.upsert(data, ['phoneNumber']);

    orm.destroy();
    return result;
  }

  async getInByPhoneNumber(phoneNumbers: string[]): Promise<Scoring[]> {
    const orm = await this.orm.initialize();
    const repository = orm.manager.getRepository(Scoring);
    const result = (await repository
      .createQueryBuilder()
      .where('phone_number IN (:...phoneNumbers)', { phoneNumbers })
      .getMany()) as unknown as Scoring[];
    orm.destroy();
    return result;
  }
}
