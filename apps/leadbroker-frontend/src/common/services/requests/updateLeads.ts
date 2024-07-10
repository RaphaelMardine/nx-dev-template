import { api } from '@v4company/services';
import { MyLeadResponse } from '../../types';

export interface UpdateStep {
  id: string;
  step: string;
  lostReason?: string;
}

export async function updateStep(body: UpdateStep) {
  const obj: {
    error: Record<string, unknown> | null;
    data: MyLeadResponse;
  } = { error: null, data: {} as MyLeadResponse };
  try {
    const response = await api.put(`/leads/update-steps`, body);
    obj.data = response.data;

    return obj;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    obj.error = err.response?.data;
    return obj;
  }
}
