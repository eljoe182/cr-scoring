import { IBaseUseCase } from 'src/shared/domain';
import { IBitelRepository, IClaroRepository, IEntelRepository, IMovistarRepository } from '../infrastructure/interface';
import { OperatorData } from '../domain/contracts';
import { SetOperatorsUseCaseParams } from '../domain/interface/IOperatorsParams';
import { GetManagementHistoryUseCaseResult } from 'src/features/crMaster/domain/interface';
import { Operator } from 'src/shared/class/Operator';
import { Bitel, Claro, Entel, Movistar } from 'src/shared/infrastructure/persistance/entities';

export default class SetOperatorUseCase implements IBaseUseCase<SetOperatorsUseCaseParams[]> {
  constructor(
    private readonly repositoryBitel: IBitelRepository<number, Bitel[]>,
    private readonly repositoryClaro: IClaroRepository<number, Claro[]>,
    private readonly repositoryEntel: IEntelRepository<number, Entel[]>,
    private readonly repositoryMovistar: IMovistarRepository<number, Movistar[]>
  ) {}

  async execute(data: SetOperatorsUseCaseParams[]): Promise<OperatorData> {
    const phoneNumbers = data
      .filter((item) => item.phoneNumber.toString().length === 9)
      .map((info) => info.phoneNumber);

    const uniquePhoneNumbers = [...new Set(phoneNumbers)];

    const bitelNumbers = await this.repositoryBitel.getInByPhoneNumber(uniquePhoneNumbers);
    const claroNumbers = await this.repositoryClaro.getInByPhoneNumber(uniquePhoneNumbers);
    const entelNumbers = await this.repositoryEntel.getInByPhoneNumber(uniquePhoneNumbers);
    const movistarNumbers = await this.repositoryMovistar.getInByPhoneNumber(uniquePhoneNumbers);

    const numbersValid = [...bitelNumbers, ...claroNumbers, ...entelNumbers, ...movistarNumbers].filter(
      (item) => item.phoneNumber.toString().length === 9
    );

    return Promise.allSettled(
      data.map((info) => {
        const phoneNumber = info.phoneNumber;

        if (isNaN(phoneNumber) || phoneNumber === 0) {
          return Promise.reject('Phone number is not valid');
        }

        const operator = numbersValid.filter((number) => number.phoneNumber === phoneNumber);

        if (operator.length === 0) {
          return Promise.reject(`The phone number ${phoneNumber} does not have an operator`);
        }

        if (operator.length > 1) {
          const bestRow = operator.reduce((a, b) => (a.updatedAt > b.updatedAt ? a : b));
          bestRow.moreThanOne = true;
          return Promise.resolve({
            ...info,
            operator: bestRow,
          });
        }

        return Promise.resolve({
          ...info,
          operator: operator[0],
        });
      })
    ).then((results) => {
      const success: GetManagementHistoryUseCaseResult[] = [];
      const errors: string[] = [];

      results.forEach((result) => {
        if (result.status === 'fulfilled') {
          const operator = new Operator(result.value).toPrimitives();
          success.push({ ...operator });
        }
        if (result.status === 'rejected') {
          errors.push(result.reason);
        }
      });

      return {
        success,
        errors,
      };
    });
  }
}
