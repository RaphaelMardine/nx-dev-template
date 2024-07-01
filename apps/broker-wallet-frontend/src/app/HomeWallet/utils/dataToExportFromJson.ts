import { badge } from '../constants';
import { convertCentsToBRL, formatDate } from '@v4company/utils';
import { getTypeTransaction } from './getTypeTransaction';
import { TransactionsResponse } from '../../../common/types';

export function dataToExportFromJson(data: TransactionsResponse[] | undefined) {
  const dataToSend = data?.map((item: TransactionsResponse) => {
    return {
      id: item._id || '-',
      tipo: getTypeTransaction(item.type) || '-',
      autor: item.user.name || '-',
      data: formatDate(item.createdAt) || '-',
      status: badge[item.status]?.label || '-',
      valor: convertCentsToBRL(item.amount) || '-',
    };
  });

  if (!dataToSend) {
    return '';
  }

  return dataToSend;
}
