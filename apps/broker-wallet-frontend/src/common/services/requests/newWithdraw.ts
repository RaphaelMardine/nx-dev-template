import { WithdrawDetails } from '../../types';
import { leadBrokerApi } from '../api';

export async function newWithdraw(amount: number) {
  const obj: {
    error: Record<string, unknown> | null;
    data: unknown;
  } = { error: null, data: {} as unknown };
  try {
    const response = await leadBrokerApi.post('wallet/withdraw', { amount });

    const withdrawDetails: WithdrawDetails = response.data;

    obj.data = withdrawDetails;

    return obj;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    obj.error = err.response?.data;
    return obj;
  }
}
