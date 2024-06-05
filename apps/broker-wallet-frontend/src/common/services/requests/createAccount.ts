import { api } from '@v4company/services';
import { parseCookies } from 'nookies';
import { IAddAccountDTO } from '../../types';

export async function createAccount(data: IAddAccountDTO) {
  const obj: {
    error: Record<string, unknown> | null;
    data: unknown;
  } = { error: null, data: {} as unknown };
  try {
    const cookies = parseCookies(undefined);

    const response = await api.post(
      `/brokers-wallet/configure-iugu-account`,
      data,
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
