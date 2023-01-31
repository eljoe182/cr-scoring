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
    name: 'with_whatsapp',
    type: 'tinyint',
  })
  withWhatsapp!: boolean;

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
