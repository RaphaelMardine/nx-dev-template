import { parseCookies } from 'nookies';
import { api } from '@v4company/services';
import {
  TransactionsPaginatedResponse,
  TransactionsResponse,
} from '../../types';
import { DateRange } from 'react-day-picker';
import { SortingState } from '@tanstack/react-table';

export async function getTransactions(
  flow: string,
  type?: string[],
  date?: DateRange | undefined,
  page = 1,
  perPage = 10,
  sorting?: SortingState
) {
  const obj: {
    error: Record<string, unknown> | null;
    data: TransactionsPaginatedResponse;
  } = { error: null, data: {} as TransactionsPaginatedResponse };
  try {
    const cookies = parseCookies(undefined);
    const typeParams = type ? `&type=${JSON.stringify(type)}` : '';
    const dateParams =
      date?.from && date?.to
        ? `&startDate=${date.from}&endDate=${date.to}`
        : '';
    const dateRange =
      date?.from && date?.to ? `/find-transactions-range-date` : '';

    const sortingParams = sorting
      ?.map((sort) => {
        return `&sort=${sort.id}&sortDir=${sort.desc ? 'desc' : 'asc'}`;
      })
      .join('');

    const response = await api.get(
      `/transactions${dateRange}?flow=${flow}${typeParams}${dateParams}&page=${page}&perPage=${perPage}${sortingParams}`,
      {
        headers: { Authorization: `Bearer ${cookies['v4company.token']}` },
      }
    );
    obj.data = response.data;

    return obj;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    obj.error = err.response?.data;
    return obj;
  }
}

export async function getInvoiceById(id: string) {
  const obj: {
    error: Record<string, unknown> | null;
    data: TransactionsResponse;
  } = { error: null, data: {} as TransactionsResponse };
  try {
    const cookies = parseCookies(undefined);
    const response = await api.get(
      `/transactions/find-by-id?transactionId=${id}&isRefunded=true`,
      {
        headers: { Authorization: `Bearer ${cookies['v4company.token']}` },
      }
    );
    obj.data = response.data;

    return obj;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    obj.error = err.response?.data;
    return obj;
  }
}
