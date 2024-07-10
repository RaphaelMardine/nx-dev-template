import { api } from '@v4company/services';
import { FileList } from './sendFiles';

export interface IRefundData {
  refundReason: string;
  automaticReject?: boolean;
  refundValues: {
    depositAmount: number;
    bonusAmount: number;
  };
  refundItem: {
    auctionId: string;
    externalId: string;
    packId: string;
    leadName: string;
    purchasedType: 'Pack' | 'Lead';
    purchasedAt: Date;
  };
  managerUser: {
    _id: string;
    name: string;
  };
  attachments: FileList[];
  refundJustification: {
    reason: string;
    description: string;
  };
  requestingUser: {
    phone: string;
  };
  purchasedAt: Date;
}

export async function requestRefund(data: IRefundData) {
  const obj: {
    error: Record<string, unknown> | null;
    data: IRefundData;
  } = { error: null, data: {} as IRefundData };

  try {
    const response = await api.post('manager-broker-refund', data);

    obj.data = response.data;

    return obj;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    obj.error = err.response?.data;
    return obj;
  }
}
