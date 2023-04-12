export interface Operator {
  operator: string;
  document: number;
  fullName: string;
  phoneNumber: number;
  origin: string;
  originDate: Date;
  subscription: string;
  activationDate: Date | null;
  model: string;
  withWhatsapp: boolean;
  moreThanOne: boolean;
  createdAt: Date;
  updatedAt: Date;
}