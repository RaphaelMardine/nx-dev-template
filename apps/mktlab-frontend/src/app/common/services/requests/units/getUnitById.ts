import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { lambdaApi } from '../../api';

interface IGetUnitResponse  {
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

export function UseQueryUnitById(unitId: string | undefined): UseQueryResult<{
  data: IGetUnitResponse;
}> {
  return useQuery({
    queryKey: ['unitById', unitId],
    queryFn: () => lambdaApi(`franchise/${unitId}`),
  });
}

export async function getUnitById(
  unitId: string
): Promise<IGetUnitResponse | undefined> {
  try {
    const response = await lambdaApi.get(`franchise/${unitId}`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}
