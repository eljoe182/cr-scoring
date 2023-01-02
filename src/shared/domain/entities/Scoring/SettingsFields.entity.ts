import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';

@Entity('settings_fields')
export class SettingsFields {
  @ObjectIdColumn({
    name: '_id',
    type: 'string',
  })
  id!: ObjectID;
  
  @Column({
    name: 'tableName',
    type: 'string',
  })
  tableName!: string;

  @Column({
    name: 'database',
    type: 'string',
  })
  database!: string;

  @Column({
    name: 'field',
    type: 'string',
  })
  field!: string;

  @Column({
    name: 'value',
    type: 'number',
  })
  value!: number;
}
