import { lambdaApi } from '../api';

interface IResReqDeactivateUnit {
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

export interface IDeactivateUnitReq {
  id: string;
  cofId: string;
  status: string;
}

export async function updateUnit(
  DataToSend: IDeactivateUnitReq
): Promise<IResReqDeactivateUnit | undefined> {
  try {
    const response = await lambdaApi.put('franchise/update', DataToSend);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}
