export interface IGetFieldsRepository {
  getFieldsCRMaster(): Promise<unknown>;
  getFieldsInfocall(): Promise<unknown>;
}
