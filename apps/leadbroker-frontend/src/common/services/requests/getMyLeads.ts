import { parseCookies } from 'nookies';
import { api } from '@v4company/services';
import { SortingState } from '@tanstack/react-table';
import { MyLeadsPaginatedResponse } from '../../types';

const urlBase = {
  LEADS_PURCHASED: 'leads?won=true&',
  LEADS_REFUNDED: 'refund-request?',
};

export async function getMyLeads(
  tab: 'LEADS_PURCHASED' | 'LEADS_REFUNDED',
  page = 1,
  limit = 10,
  sorting?: SortingState
) {
  const obj: {
    error: Record<string, unknown> | null;
    data: MyLeadsPaginatedResponse;
  } = { error: null, data: {} as MyLeadsPaginatedResponse };
  try {
    const cookies = parseCookies(undefined);

    const sortingParams = sorting
      ?.map((sort) => {
        return `&sort=${sort.id}&sortDir=${sort.desc ? 'desc' : 'asc'}`;
      })
      .join('');

    const response = await api.get(
      `/${urlBase[tab]}page=${page}&limit=${limit}${sortingParams}`,
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
