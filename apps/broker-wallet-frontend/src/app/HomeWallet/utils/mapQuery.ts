import { TransactionType } from '../../../common/types';

export interface FilterProps {
  label: string;
  key: string;
  type: TransactionType[];
}

const inputQueryArray: FilterProps[] = [
  {
    label: 'Depósitos',
    key: 'deposits',
    type: [TransactionType.DEPOSIT],
  },
  {
    label: 'Reembolsos',
    key: 'refunds',
    type: [TransactionType.REFUND],
  },
  {
    label: 'Recebimento de Bônus',
    key: 'receivingBonuses',
    type: [TransactionType.RECEIVED_BONUS],
  },
  {
    label: 'Lance Restituído',
    key: 'bidRefunded',
    type: [
      TransactionType.REFUND_BID_LEAD,
      TransactionType.REFUND_BID_MEETING,
      TransactionType.REFUND_BID_PACK,
    ],
  },
];

const outputQueryArray: FilterProps[] = [
  {
    label: 'Compras',
    key: 'purchase',
    type: [
      TransactionType.BUY_NOW_LEAD,
      TransactionType.BUY_NOW_MEETING,
      TransactionType.BUY_NOW_PACK,
    ],
  },
  {
    label: 'Lance Realizado',
    key: 'bidMade',
    type: [
      TransactionType.BID_LEAD,
      TransactionType.BID_MEETING,
      TransactionType.BID_PACK,
    ],
  },
  {
    label: 'Solicitação de Saque',
    key: 'withdrawalRequest',
    type: [TransactionType.WITHDRAWAL],
  },
  {
    label: 'Bônus Expirado',
    key: 'expiredBonus',
    type: [TransactionType.BONUS_EXPIRED],
  },
];

export const typesFilter: Record<string, FilterProps[]> = {
  ALL: [...inputQueryArray, ...outputQueryArray],
  INPUT: inputQueryArray,
  OUTPUT: outputQueryArray,
};
