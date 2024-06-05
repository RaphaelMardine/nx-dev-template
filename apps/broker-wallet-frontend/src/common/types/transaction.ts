/* eslint-disable no-shadow */

export enum DepositMethod {
  BANK_SLIP = 'BANK_SLIP',
  PIX = 'PIX',
  CREDIT_CARD = 'CREDIT_CARD',
  HEADQUARTER = 'HEADQUARTER',
}

export enum TransactionFlow {
  INPUT = 'INPUT',
  OUTPUT = 'OUTPUT',
}

export enum TransactionStatus {
  FINISHED = 'FINISHED',
  CANCELED = 'CANCELED',
  UNDER_ANALYSIS = 'UNDER_ANALYSIS',
}

export enum TransactionItemType {
  MEET = 'MEET',
  LEAD_UNITARY = 'LEAD_UNITARY',
  PACK = 'PACK',
}

export enum TransactionItemAction {
  BID = 'BID',
  BUY_NOW = 'BUY_NOW',
}

export enum TransactionType {
  DEPOSIT = 'DEPOSIT',
  RECEIVED_BONUS = 'RECEIVED_BONUS',
  WITHDRAWAL = 'WITHDRAWAL',
  BONUS_EXPIRED = 'BONUS_EXPIRED',
  BUY_NOW_MEETING = 'BUY_NOW_MEETING',
  BUY_NOW_LEAD = 'BUY_NOW_LEAD',
  BUY_NOW_PACK = 'BUY_NOW_PACK',
  BID_LEAD = 'BID_LEAD',
  BID_PACK = 'BID_PACK',
  BID_MEETING = 'BID_MEETING',
  REFUND_BID_LEAD = 'REFUND_BID_LEAD',
  REFUND_BID_MEETING = 'REFUND_BID_MEETING',
  REFUND_BID_PACK = 'REFUND_BID_PACK',
  REFUND = 'REFUND',
}

export interface ITransactionItem {
  _id: string;
  type: TransactionItemType;
  action: TransactionItemAction;
}

export interface ITransactionUser {
  _id: string;
  name: string;
  email: string;
  picture?: string;
}

export interface ITransaction {
  _id?: string;
  amount: number;
  item?: ITransactionItem;
  user: ITransactionUser;
  unitId: string;
  wasReimbursed?: boolean;
  transactionType: string;
  invoiceId?: string;
  walletId: string;
  realAmountUsed?: number;
  rewardUsed?: number;
  type: TransactionType;
  transactionFlow: TransactionFlow;
  status: TransactionStatus;
  depositMethod?: DepositMethod;
  rewardExpirationDate?: Date;
}

export interface TransactionsResponse extends Omit<ITransaction, '_id'> {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  wasReimbursed: boolean;
}

export interface TransactionsPaginatedResponse {
  items: TransactionsResponse[];
  currentPage: number;
  perPage: number;
  lastPage: number;
  total: number;
}

export interface Pagination {
  currentPage: number;
  perPage: number;
  lastPage: number;
  total: number;
}
