import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';

@Entity('scoring')
export class Scoring extends BaseEntity {
  @PrimaryColumn({
    name: 'phone_number',
    type: 'bigint',
  })
  phoneNumber!: string;

  @Column({
    name: 'operator',
    type: 'varchar',
  })
  operator!: string;

  @Column({
    name: 'score',
    type: 'int',
  })
  score!: number;

  @Column({
    name: 'beast_date',
    type: 'date',
  })
  beastDate!: Date;

  @Column({
    name: 'better_management',
    type: 'varchar',
  })
  betterManagement!: string;

  @Column({
    name: 'beast_try',
    type: 'varchar',
  })
  beastTry!: string;

  @Column({
    name: 'with_whatsapp',
    type: 'tinyint',
  })
  withWhatsapp!: boolean;

  @CreateDateColumn({
    name: 'created_at',
    type: 'datetime',
    default: () => 'NOW()',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'datetime',
    default: () => 'NOW()',
    onUpdate: 'NOW()',
    nullable: true,
  })
  updatedAt!: Date;
}
