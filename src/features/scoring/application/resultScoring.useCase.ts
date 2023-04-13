import { IBaseUseCase } from '../../../shared/domain';
import { paramsVicidial } from '../../../features/infocall/domain/contracts';
import { GetInfoVicidialDataContract } from '../../../features/crMaster/domain/contracts';

export default class ResultScoringUseCase implements IBaseUseCase {
  constructor(private getInfoVicidialUseCase: IBaseUseCase) {}

  public async execute(resultScoring: paramsVicidial): Promise<unknown> {
    const { core, listId } = resultScoring;
    const vicidialData = await this.getInfoVicidialUseCase.execute({
      core,
      listId,
    }) as unknown as GetInfoVicidialDataContract;
    return vicidialData;
  }
}
