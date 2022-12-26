export interface IGetInfoEntelUseCase {
  execute(phoneNumber: number): Promise<unknown>;
}