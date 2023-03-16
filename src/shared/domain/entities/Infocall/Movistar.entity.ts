import { Entity, Column, PrimaryColumn, VirtualColumn } from 'typeorm';

@Entity('movistar')
export class Movistar {
  @VirtualColumn({
    type: 'string',
    query: () => "select 'movistar' as operator",
  })
  operator!: string;

  @PrimaryColumn({
    name: 'numero',
    type: 'int',
  })
  phoneNumber!: number;

  @Column({
    name: 'documento',
    type: 'bigint',
  })
  document!: number;

  @Column({
    name: 'nombre',
    type: 'varchar',
  })
  fullName!: string;

  @Column({
    name: 'origen_data',
    type: 'varchar',
    length: 100,
  })
  origin!: string;

  @Column({
    name: 'fecha_data',
    type: 'date',
  })
  originDate!: Date;

  @Column({
    name: 'plan',
    type: 'varchar',
    length: 200,
  })
  subscription!: string;

  @Column({
    name: 'modelo',
    type: 'varchar',
    length: 200,
  })
  model!: string;

  @Column({
    name: 'with_whatsapp',
    type: 'tinyint',
  })
  withWhatsapp!: boolean;

  @VirtualColumn({
    type: 'string',
    query: () => "select 0 as 'moreThanOne'",
  })
  moreThanOne!: boolean;

  @Column({
    name: 'created_at',
    type: 'datetime',
  })
  createdAt!: Date;

  @Column({
    name: 'updated_at',
    type: 'datetime',
  })
  updatedAt!: Date;
}
