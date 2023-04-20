import { Entity, Column, PrimaryColumn, BaseEntity } from 'typeorm';

export interface FRVicidialList {
  leadId: number;
  phoneNumber: number;
  listId: number;
  sourceId: string;
  vendorLeadCode: string;
}

@Entity('FR_vicidial_list')
export class FRVicidialListEntity extends BaseEntity implements FRVicidialList {
  @PrimaryColumn({
    name: 'lead_id',
    type: 'numeric',
  })
  leadId!: number;

  @Column({
    name: 'phone_number',
    type: 'bigint',
  })
  phoneNumber!: number;

  @Column({
    name: 'list_id',
    type: 'numeric',
  })
  listId!: number;

  @Column({
    name: 'source_id',
    type: 'varchar',
    length: 50,
  })
  sourceId!: string;

  @Column({
    name: 'vendor_lead_code',
    type: 'varchar',
    length: 20,
  })
  vendorLeadCode!: string;
}
