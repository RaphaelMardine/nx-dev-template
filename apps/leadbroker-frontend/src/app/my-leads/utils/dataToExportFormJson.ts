import { convertCentsToBRL, formatDate } from '@v4company/utils';
import { MyLeadResponse } from '../../../common';
import { badge } from '../constants';

export function dataToExportFromJson(data: MyLeadResponse[]) {
  const dataToSend = data?.map((item: MyLeadResponse) => {
    return {
      Nome: item?.lead?.name || '-',
      Telefone: item?.lead?.tel || '-',
      Faturamento: item?.lead?.revenue || '-',
      Arrematador: item?.winner?.name || '-',
      Tipo: item?.packId ? 'Pack' : 'Lead',
      'Comprado em': item?.winner?.boughtAt
        ? formatDate(item?.winner?.boughtAt)
        : '-',
      Valor: convertCentsToBRL(item?.winner?.realValue || 0) || '-',
      Status: badge[item?.steps || 'IN_PROSPECTING']?.label,
    };
  });

  if (!dataToSend) {
    return '';
  }

  return dataToSend;
}
