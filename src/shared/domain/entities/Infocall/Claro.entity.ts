import { Entity, Column, PrimaryColumn, VirtualColumn } from 'typeorm';

@Entity('claro')
export class Claro {
  @VirtualColumn({
    type: 'string',
    query: () => "select 'claro' as operator",
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

  @VirtualColumn({
    type: 'string',
    query: () => "select false as 'moreThanOne'",
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
