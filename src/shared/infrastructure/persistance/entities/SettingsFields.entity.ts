import { Entity, Column, ObjectIdColumn, ObjectId, BaseEntity } from 'typeorm';

export interface SettingsFields {
  id?: ObjectId;
  campaign: string;
  database: string;
  tableName: string;
  field: string;
  condition: string;
  valueCondition: string;
  valueScore: number;
}

@Entity('settings_fields')
export class SettingsFieldsEntity extends BaseEntity implements SettingsFields {
  @ObjectIdColumn({
    name: '_id',
    type: 'string',
  })
  id!: ObjectId;

  @Column({
    name: 'campaign',
    type: 'string',
  })
  campaign!: string;

  @Column({
    name: 'database',
    type: 'string',
  })
  database!: string;

  @Column({
    name: 'tableName',
    type: 'string',
  })
  tableName!: string;

  @Column({
    name: 'field',
    type: 'string',
  })
  field!: string;

  @Column({
    name: 'condition',
    type: 'string',
  })
  condition!: string;

  @Column({
    name: 'valueCondition',
    type: 'string',
  })
  valueCondition!: string;

  @Column({
    name: 'valueScore',
    type: 'number',
  })
  valueScore!: number;
}
