import { DepositMethod, TransactionType } from '../../../common/types';

export const TransactionsType: Record<TransactionType, string> = {
  DEPOSIT: 'Depósito',
  RECEIVED_BONUS: 'Recebimento de Bônus',
  WITHDRAWAL: 'Solicitação de saque',
  BONUS_EXPIRED: 'Bônus Expirado',
  BUY_NOW_MEETING: 'Compra de Reuniões',
  BUY_NOW_LEAD: 'Compra de Lead Unitário',
  BUY_NOW_PACK: 'Compra de Pack',
  BID_LEAD: 'Lance em Lead',
  BID_PACK: 'Lance em Pack',
  BID_MEETING: 'Lance em Meeting',
  REFUND_BID_LEAD: 'Lance em Lead Restituído',
  REFUND_BID_MEETING: 'Lance em Meeting Restituído',
  REFUND_BID_PACK: 'Lance em Pack Restituído',
  REFUND: 'Reembolso',
};

export const TransactionsDepositMethod: Record<DepositMethod, string> = {
  BANK_SLIP: 'Depósito via Boleto',
  PIX: 'Depósito via Pix',
  CREDIT_CARD: 'Depósito via Cartão de Credito',
  HEADQUARTER: 'Depósito via HQ',
};

export const getTypeTransaction = (data: unknown): string => {
  const { type, method } = data as {
    type: TransactionType;
    method: DepositMethod;
  };
  if (type === TransactionType.DEPOSIT) {
    return TransactionsDepositMethod[method as DepositMethod];
  }
  return TransactionsType[type as TransactionType];
};
