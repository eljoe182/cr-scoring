import { Entity, Column, PrimaryColumn, BaseEntity } from 'typeorm';

export interface VicidialLists {
  listId: number;
  listName: string;
  campaignId: string;
  active: string;
}

@Entity('FR_vicidial_lists')
export class VicidialListsEntity extends BaseEntity implements VicidialLists {
  @PrimaryColumn({
    name: 'list_id',
    type: 'numeric',
  })
  listId!: number;

  @Column({
    name: 'list_name',
    type: 'varchar',
    length: 30,
  })
  listName!: string;

  @Column({
    name: 'campaign_id',
    type: 'varchar',
    length: 8,
  })
  campaignId!: string;

  @Column({
    name: 'active',
    type: 'varchar',
    length: 1,
  })
  active!: string;
}
