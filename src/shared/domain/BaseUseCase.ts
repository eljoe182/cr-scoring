export interface IBaseUseCase {
  execute(params?: unknown): Promise<unknown>;
}