import { BaseEntity, Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

interface Range {
  min: number;
  max: number;
}

export interface ScoringRules {
  id?: string | ObjectId;
  campaign: string;
  score1: Range;
  score2: Range;
  score3: Range;
  score4: Range;
  score5: Range;
}

@Entity('scoring_rules')
export class ScoringRulesEntity extends BaseEntity implements ScoringRules {
  @ObjectIdColumn({
    name: '_id',
    type: 'string',
  })
  id!: string | ObjectId;

  @Column({
    name: 'campaign',
    type: 'string',
  })
  campaign!: string;

  @Column({
    name: 'score1',
  })
  score1!: Range;

  @Column({
    name: 'score2',
  })
  score2!: Range;

  @Column({
    name: 'score3',
  })
  score3!: Range;

  @Column({
    name: 'score4',
  })
  score4!: Range;

  @Column({
    name: 'score5',
  })
  score5!: Range;
}