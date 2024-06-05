import { api } from '@v4company/services';
import { parseCookies } from 'nookies';

export async function postPdfReceipt(id: string, wasReimbursed: boolean) {
  const cookies = parseCookies(undefined);
  try {
    const response = await api.post(
      `/brokers-wallet/extract/`,
      { id, wasReimbursed },
      {
        headers: { Authorization: `Bearer ${cookies['v4company.token']}` },
      }
    );
    const permissions = response.data;

    return permissions;
  } catch (err: unknown | any) {
    return { error: err.response.data };
  }
}
