import { paramsVicidial } from '@feat/infocall/domain/contracts/ResulScoringParamsContract';
import { IBaseUseCase } from '@shared/domain/BaseUseCase';
import { GetInfoVicidialDataContract } from '@feat/crMaster/domain/contracts/GetInfoVicidialResponseContract';

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
