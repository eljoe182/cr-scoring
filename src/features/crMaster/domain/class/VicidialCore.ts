import { FRVicidialList } from "src/shared/infrastructure/persistance/entities";

export default class VicidialCore {
  constructor(private data: FRVicidialList) {}
  toPrimitive() {
    return {
      leadId: this.data.leadId,
      phoneNumber: Number(this.data.phoneNumber),
      listId: this.data.listId,
      sourceId: this.data.sourceId,
      vendorLeadCode: this.data.vendorLeadCode,
    };
  }
}