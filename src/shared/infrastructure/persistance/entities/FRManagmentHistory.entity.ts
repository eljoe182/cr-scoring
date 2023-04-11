import { Entity, Column, PrimaryColumn, BaseEntity } from 'typeorm';

export interface ManagementHistory {
  id: string;
  callDate: Date;
  year: number;
  month: number;
  phoneNumber: string;
  agent: string;
  listId: number;
  campaign: string;
  contactGroup: string;
  typeOfAttempt: string;
}

@Entity('FR_HistoricoGestiones')
export class ManagementHistoryEntity extends BaseEntity implements ManagementHistory {
  @PrimaryColumn({
    name: 'UNIQUEID',
    type: 'numeric',
  })
  id!: string;

  @Column({
    name: 'CALLDATE',
    type: 'datetime2',
  })
  callDate!: Date;

  @Column({
    name: 'TRN_YEAR',
    type: 'int',
  })
  year!: number;

  @Column({
    name: 'TRN_MONTH',
    type: 'int',
  })
  month!: number;

  @Column({
    name: 'TRN_PHONENUM',
    type: 'char',
    length: 30,
  })
  phoneNumber!: string;

  @Column({
    name: 'TRN_AGENTNAME',
    type: 'char',
    length: 20,
  })
  agent!: string;

  @Column({
    name: 'TRN_UNITID',
    type: 'numeric',
  })
  listId!: number;

  @Column({
    name: 'TRN_CAMPAIGN',
    type: 'varchar',
    length: 8,
  })
  campaign!: string;

  @Column({
    name: 'GRUPO_CONTACTO',
    type: 'varchar',
    length: 8,
  })
  contactGroup!: string;

  @Column({
    name: 'TIPO_INTENTO',
    type: 'nvarchar',
    length: 30,
  })
  typeOfAttempt!: string;
}
