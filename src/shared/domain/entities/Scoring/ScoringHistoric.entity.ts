import { Entity, Column, ObjectIdColumn, ObjectID, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('scoring_historic')
export class ScoringHistoric {
  @ObjectIdColumn({
    name: '_id',
    type: 'string',
  })
  id?: ObjectID;

  @Column({
    name: 'period',
    type: 'string',
  })
  period!: string;
  
  @Column({
    name: 'data',
    type: 'array',
  })
  data!: {
    phoneNumber: string;
    score?: number;
    createdAt?: Date;
    updatedAt?: Date;
  }[];

  @Column({
    name: 'identifiers',
    type: 'array',
  })
  identifiers!: {
    phoneNumber: string;
  }[];

  @Column({
    name: 'generatedMaps',
    type: 'array',
  })
  generatedMaps!: {
    phoneNumber: string;
    score?: number;
    createdAt?: Date;
    updatedAt?: Date;
  }[];

  @Column({
    name: 'raw',
  })
  raw!: {
    fieldCount: number;
    affectedRows: number;
    insertId: number;
    info: string;
    serverStatus: number;
    warningStatus: number;
  };

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt?: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt?: Date;
}
