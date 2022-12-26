import { Entity, Column } from 'typeorm';

@Entity('claro')
export class Claro {
  @Column({
    name: 'documento',
    type: 'bigint',
    length: 20,
  })
  document!: number;

  @Column({
    name: 'nombre',
    type: 'varchar',
    length: 120,
  })
  fullName!: string;

  @Column({
    name: 'numero',
    type: 'int',
    length: 11,
  })
  phoneNumber!: number;

  @Column({
    name: 'validata_updated_at',
    type: 'datetime',
  })
  validataUpdatedAt!: Date;

  @Column({
    name: 'validata_created_at',
    type: 'datetime',
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
