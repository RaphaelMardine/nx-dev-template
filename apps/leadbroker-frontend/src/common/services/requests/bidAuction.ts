import { parseCookies } from 'nookies';
import { MyLeadResponse } from '../../types';
import { apiGateway } from '../api';

interface BidProps {
  _id: string;
  auction: string;
  value: number;
  buyNow?: boolean;
}
export async function bidAuction(data: BidProps) {
  const obj: {
    error: Record<string, unknown> | null;
    data: MyLeadResponse;
  } = { error: null, data: {} as MyLeadResponse };
  try {
    const cookies = parseCookies(undefined);

    const response = await apiGateway.post(`/brokers/bid`, data, {
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
