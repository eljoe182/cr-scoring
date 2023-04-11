import { Entity, Column, PrimaryColumn, BaseEntity } from 'typeorm';

export interface CRWallet {
  id: number;
  name: string;
  code: string;
  status: number;
  provId: number;
  typeId: number;
}

@Entity('CR_CARTERA')
export class CRWalletEntity extends BaseEntity implements CRWallet {
  @PrimaryColumn({
    name: 'CART_ID',
    type: 'int',
  })
  id!: number;

  @Column({
    name: 'CART_NOMBRE',
    type: 'varchar',
    length: 50,
  })
  name!: string;

  @Column({
    name: 'CART_CODIGO',
    type: 'varchar',
    length: 50,
  })
  code!: string;

  @Column({
    name: 'CART_ESTADO',
    type: 'int',
  })
  status!: number;

  @Column({
    name: 'PROV_ID',
    type: 'int',
  })
  provId!: number;

  @Column({
    name: 'TPCA_ID',
    type: 'int',
  })
  typeId!: number;
}
