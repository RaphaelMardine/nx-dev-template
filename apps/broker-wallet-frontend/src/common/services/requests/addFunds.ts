import { api } from '@v4company/services';
import { parseCookies } from 'nookies';
import { PaymentDetails, IAddFundsDTO } from '../../types';

export async function addFunds(dataPayment: IAddFundsDTO) {
  const obj: {
    error: Record<string, unknown> | null;
    data: PaymentDetails;
  } = { error: null, data: {} as PaymentDetails };
  try {
    const cookies = parseCookies(undefined);

    const response = await api.post(
      `/brokers-wallet/new-deposit`,
      dataPayment,
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
