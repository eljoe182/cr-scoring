export interface IVicidialListsRepository<R = unknown> {
  getVicidialLists(): Promise<R[]>;
  getCampaignByListId(listId: string): Promise<R>;
}
