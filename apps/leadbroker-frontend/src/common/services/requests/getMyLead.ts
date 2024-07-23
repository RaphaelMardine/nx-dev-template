import { api } from '@v4company/services';
import { MyLeadResponse } from '../../types';
import { parseCookies } from 'nookies';

export async function getMyLead(leadId: string) {
  const obj: {
    error: Record<string, unknown> | null;
    data: MyLeadResponse;
  } = { error: null, data: {} as MyLeadResponse };
  try {
    const cookies = parseCookies(undefined);

    const response = await api.get(`/leads/${leadId}?won=true`, {
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

export async function getMyLeadRefund(leadId: string) {
  const obj: {
    error: Record<string, unknown> | null;
    data: MyLeadResponse;
  } = { error: null, data: {} as MyLeadResponse };
  try {
    const cookies = parseCookies(undefined);

    const response = await api.get(`/refund-request/${leadId}`, {
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
