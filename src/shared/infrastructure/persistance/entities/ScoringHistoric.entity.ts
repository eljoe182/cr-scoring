import { Entity, Column, ObjectIdColumn, ObjectID, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';

type ScoringHistoricData = {
  phoneNumber: string;
  score?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

type ScoringHistoricGeneratedMaps = {
  phoneNumber: string;
  score?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

type ScoringHistoricPhoneNumber = {
  phoneNumber: string;
}

type ScoringHistoricRaw = {
  fieldCount: number;
  affectedRows: number;
  insertId: number;
  info: string;
  serverStatus: number;
  warningStatus: number;
}

export interface ScoringHistoric {
  id?: ObjectID;
  period: string;
  data: ScoringHistoricData[];
  identifiers: ScoringHistoricPhoneNumber[];
  generatedMaps: ScoringHistoricGeneratedMaps[];
  raw: ScoringHistoricRaw;
  createdAt?: Date;
  updatedAt?: Date;
}

@Entity('scoring_historic')
export class ScoringHistoricEntity extends BaseEntity implements ScoringHistoric {
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
