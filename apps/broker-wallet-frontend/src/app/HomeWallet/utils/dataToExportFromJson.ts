import { TransactionsResponse } from 'apps/broker-wallet-frontend/src/common/types';

export function dataToExportFromJson(data: TransactionsResponse[] | undefined) {
  const dataToSend = data?.map((item: TransactionsResponse) => {
    return {
      id: item._id || '-',
      tipo: item.type || '-',
      autor: item.user.name || '-',
      data: item.createdAt || '-',
      status: item.status || '-',
      valor: item.amount || '-',
    };
  });

  if (!dataToSend) {
    return '';
  }

  return dataToSend;
}
