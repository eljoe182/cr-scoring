import { Entity, Column, PrimaryColumn, VirtualColumn } from 'typeorm';

@Entity('entel')
export class Entel {
  @VirtualColumn({
    type: 'string',
    query: () => "select 'entel' as operator",
  })
  operator!: string;

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

  @PrimaryColumn({
    name: 'numero',
    type: 'int',
  })
  phoneNumber!: number;

  @Column({
    name: 'validata_updated_at',
    type: 'date',
  })
  validataUpdatedAt!: Date;

  @Column({
    name: 'validata_created_at',
    type: 'date',
  })
  validataCreatedAt!: Date;

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
