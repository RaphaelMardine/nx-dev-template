import { api } from '@v4company/services';
import { MyLeadResponse } from '../../types';

export async function getMyLead(leadId: string) {
  const obj: {
    error: Record<string, unknown> | null;
    data: MyLeadResponse;
  } = { error: null, data: {} as MyLeadResponse };
  try {
    const response = await api.get(`/leads/${leadId}?won=true`);

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
    const response = await api.get(`/refund-request/${leadId}`);

    obj.data = response.data;

    return obj;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    obj.error = err.response?.data;
    return obj;
  }
}
