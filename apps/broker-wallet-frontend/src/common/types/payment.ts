export interface PaymentDetails {
  _id: string;
  iuguId?: string;
  walletId?: string;
  value: number;
  status: string;
  credit?: string;
  invoiceTypes: 'pix' | 'bank_slip' | 'credit_card';
  pix?: {
    qrcode: string;
    qrcodeText: string;
  };
  bankSlip?: {
    digitableLine: string;
    barcodeData: string;
    barcode: string;
  };
  message?: string;
  errorCode?: string;
  createdAt: Date;
}

export enum PAYABLE_WITH {
  ALL = 'all',
  PIX = 'pix',
  BANK_SLIP = 'bank_slip',
  CREDIT_CARD = 'credit_card',
}

export interface BillingAddressDTO {
  zipCode: string;
  street: string;
  number: string;
  city: string;
  state: string;
  country: string;
  district: string;
  complement?: string;
}

export interface PayerDTO {
  cpfCnpj: string;
  name: string;
  phonePrefix?: string;
  phone?: string;
  email: string;
}

export interface ICreateTokenDTO {
  accountId: string;
  method: 'credit_card';
  test: boolean;
  data: { creditCardToken: string };
}

export interface IAddFundsDTO {
  useUnitAddress: boolean;
  useAuthenticatedUser: boolean;
  valueWithIncrease: number;
  value: number;
  prefix?: string;
  phone?: string;
  dueDate: Date;
  payableWith: string;
  installments?: number;
  maxInstallmentsValue?: number;
  billingAddress?: BillingAddressDTO;
  payer?: PayerDTO;
  card?: Partial<ICreateTokenDTO>;
}

export interface IAddAccountDTO {
  unitId: string;
  telephone?: string;
  bank?: string;
  bankAg?: string;
  accountType?: string;
  bankCc?: string;
  respName?: string;
  respCpf?: string;
}

export interface WithdrawDetails {
  balance: {
    available: number;
    reserved: number;
  };
  _id: string;
  unitId: string;
  verified: boolean;
  createdAt: string;
  key: string;
}
