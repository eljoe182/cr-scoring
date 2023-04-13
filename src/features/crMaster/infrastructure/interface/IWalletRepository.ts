export interface IWalletRepository<T> {
  getAllWallets(): Promise<T[]>;
}
