import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';

@Entity('scoring')
export class Scoring extends BaseEntity {
  @PrimaryColumn({
    name: 'phone_number',
    type: 'bigint',
  })
  phoneNumber!: string;

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

  @CreateDateColumn({
    name: 'created_at',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  updatedAt!: Date;
}
