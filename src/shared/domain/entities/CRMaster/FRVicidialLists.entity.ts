import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('FR_vicidial_lists')
export class VicidialLists {
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
