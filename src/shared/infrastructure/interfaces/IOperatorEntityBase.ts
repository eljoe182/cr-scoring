export interface IOperatorEntityBase {
  operator: string;
  document: string;
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