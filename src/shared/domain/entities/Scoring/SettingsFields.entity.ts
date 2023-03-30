import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';

@Entity('settings_fields')
export class SettingsFields {
  @ObjectIdColumn({
    name: '_id',
    type: 'string',
  })
  id!: ObjectID;
  
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
