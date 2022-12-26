import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('movistar')
export class Movistar {
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
