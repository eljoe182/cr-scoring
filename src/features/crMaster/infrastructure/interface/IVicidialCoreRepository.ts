export interface IVicidialCoreRepository<T> {
  getInfo(listId: number): Promise<T[]>;
}
