import { Entity, Column, PrimaryColumn, BaseEntity, VirtualColumn } from 'typeorm';
import { VicidialLists } from './FRVicidialLists.entity';

@Entity('FR_vicidial_lists_11_21')
export class VicidialLists1121Entity extends BaseEntity implements VicidialLists {
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

  @VirtualColumn({
    type: 'varchar',
    query: () => "select 'CORE11' as core",
  })
  core!: string;
}
