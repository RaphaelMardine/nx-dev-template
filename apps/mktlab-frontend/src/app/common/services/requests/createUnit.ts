import { lambdaApi } from '../api';

interface IResponseCreateUnit {
  id: string;
  cofId: string;
  companyId: string;
  headquarterId: string;
  pipefyId: string;
  salesforceId: string;
  attributionModel: string;
  startDate: string;
  sapId: string;
  status: string;
  primaryPartnerId: string;
  assignatureContractDate: string;
  franchiseFee: number;
  franchiseTrainingFee: number;
}

export async function createUnit(
  DataToSend: any
): Promise<IResponseCreateUnit | undefined> {
  try {
    const response = await lambdaApi.post('franchise/create', DataToSend);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}
