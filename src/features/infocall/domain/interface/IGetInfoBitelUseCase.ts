export interface IGetInfoBitelUseCase {
  execute(phoneNumber: number): Promise<unknown>;
}
