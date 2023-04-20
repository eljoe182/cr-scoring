export interface IVicidialListsRepository<R = unknown> {
  getVicidialLists(): Promise<R[]>;
}
