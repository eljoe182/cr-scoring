export interface IBaseUseCase<T = unknown> {
  execute(params?: T): Promise<unknown>;
}