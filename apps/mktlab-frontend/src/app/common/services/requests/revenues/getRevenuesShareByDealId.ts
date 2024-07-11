import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { lambdaApi } from '../../api';

export interface RevenueShareListResponse {
  id: string
  dealId: string
  legalName: string
  percentAmount: number
  expectedPayDate: string
  centsAmount: number
}

export function UseQueryRevenuesShareByDealId(dealId: string | undefined): UseQueryResult<{
  data: RevenueShareListResponse[];
}> {
  return useQuery({
    queryKey: ['RevenuesShareByDealId', dealId],
    queryFn: () => lambdaApi(`revenues-shares/${dealId}`),
  });
}
