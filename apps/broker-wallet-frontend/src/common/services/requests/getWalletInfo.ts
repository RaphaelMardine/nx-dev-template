import { parseCookies } from 'nookies';
import { leadBrokerApi } from '../../services';

export interface WalletInfo {
  accountType: string;
  bank: string;
  account: string;
  agency: string;
  cnpj: string;
  phone: string;
  unitName: string;
}

export async function getWalletInfo() {
  const obj: {
    error: Record<string, unknown> | null;
    data: WalletInfo;
  } = { error: null, data: {} as WalletInfo };
  try {
    const cookies = parseCookies(undefined);
    const response = await leadBrokerApi.get(`/wallet/info`, {
      headers: { Authorization: `Bearer ${cookies['v4company.token']}` },
    });
    obj.data = response.data;

    return obj;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    obj.error = err.response?.data;
    return obj;
  }
}
