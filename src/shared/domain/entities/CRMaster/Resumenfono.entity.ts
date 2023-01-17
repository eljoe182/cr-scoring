import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('RS_OP_FG_RESUMENFONO')
export class Resumenfono {
  @PrimaryColumn({
    name: 'phone_number',
    type: 'nvarchar',
    length: 30,
  })
  phoneNumber!: string;

  @Column({
    name: '1.Intento Valor',
    type: 'int',
  })
  valueAttempt!: number;

  @Column({
    name: '2.Intento Regular',
    type: 'int',
  })
  regularAttempt!: number;

  @Column({
    name: '3.Intento de Alerta',
    type: 'int',
  })
  alertAttempt!: number;

  @Column({
    name: '4.Intento de Invalidación',
    type: 'int',
  })
  invalidAttempt!: number;

  @Column({
    name: '5.Estados Intermedios',
    type: 'int',
  })
  intermediateStates!: number;

  @Column({
    name: 'PERIODO',
    type: 'nvarchar',
    length: 8,
  })
  period!: string;

  @Column({
    name: 'CD',
    type: 'nvarchar',
    length: 8,
  })
  CD!: string;

  @Column({
    name: 'CNE',
    type: 'nvarchar',
    length: 8,
  })
  CNE!: string;

  @Column({
    name: 'MEJOR_GEST',
    type: 'nvarchar',
    length: 8,
  })
  betterManagement!: string;
}
