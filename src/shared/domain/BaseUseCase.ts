export interface IBaseUseCase<P = unknown, R = unknown> {
  execute(params?: P): Promise<R>;
}