import { IManagementHistoryDataRepository } from 'src/features/crMaster/domain/interface';

export type SetOperatorsUseCaseParams = Omit<IManagementHistoryDataRepository, 'phoneNumber'> & {
  phoneNumber: number;
};
