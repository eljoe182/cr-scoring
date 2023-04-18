import { ManagementHistoryData } from 'src/features/crMaster/domain/contracts/ManagementHistory.contract';
import { IOperatorEntityBase } from '../infrastructure/interfaces/IOperatorEntityBase';

interface IOperatorParams extends ManagementHistoryData {
  operator: IOperatorEntityBase;
}

export class Operator {
  constructor(private readonly data: IOperatorParams) {}

  toPrimitives(): IOperatorParams {
    return {
      betterAttempt: this.data.betterAttempt,
      betterAttemptValue: this.data.betterAttemptValue,
      betterManagement: this.data.betterManagement,
      betterManagementDate: this.data.betterManagementDate || new Date(1).toISOString(),
      CD: this.data.CD,
      CNE: this.data.CNE,
      deceased: this.data.deceased,
      length: this.data.length,
      NC: this.data.NC,
      phoneNumber: this.data.phoneNumber,
      talkTime: this.data.talkTime,
      totalManagement: this.data.totalManagement,
      wrong: this.data.wrong,
      operator: {
        operator: this.data.operator.operator,
        phoneNumber: this.data.operator.phoneNumber,
        document: this.data.operator.document,
        fullName: this.data.operator.fullName,
        model: this.data.operator.model,
        origin: this.data.operator.origin,
        activationDate: this.data.operator.activationDate,
        subscription: this.data.operator.subscription,
        withWhatsapp: Boolean(this.data.operator.withWhatsapp),
        moreThanOne: this.data.operator.moreThanOne,
        originDate: this.data.operator.originDate,
        createdAt: this.data.operator.createdAt,
        updatedAt: this.data.operator.updatedAt,
      },
    };
  }
}
