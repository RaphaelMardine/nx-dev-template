import { api } from '@v4company/services';
import { parseCookies } from 'nookies';
import { AuctionResponse, MyLeadResponse } from '../../types';

export async function getAuctions(pageParam = 1, url: string) {
  const obj: {
    error: Record<string, unknown> | null;
    data: AuctionResponse;
  } = { error: null, data: {} as AuctionResponse };
  try {
    const cookies = parseCookies(undefined);

    const response = await api.get(`${url}page=${pageParam}&limit=16`, {
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

export async function getAuction({
  auctionId,
  packId,
}: {
  auctionId: string;
  packId: string;
}) {
  const obj: {
    error: Record<string, unknown> | null;
    data: MyLeadResponse;
  } = { error: null, data: {} as MyLeadResponse };
  try {
    const cookies = parseCookies(undefined);

    const response = await api.get(
      `/${auctionId ? 'leads' : 'packs'}/${auctionId || packId}`,
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
