import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';

export interface Scoring {
  phoneNumber: number;
  operator: string;
  score: number;
  beastDate: Date;
  betterManagement: string;
  beastTry: string;
  withWhatsapp: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

@Entity('scoring')
export class ScoringEntity extends BaseEntity implements Scoring {
  @PrimaryColumn({
    name: 'phone_number',
    type: 'bigint',
  })
  phoneNumber!: number;

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
