export interface IGetInfoClaroUseCase {
  execute(phoneNumber: number): Promise<unknown>;
}