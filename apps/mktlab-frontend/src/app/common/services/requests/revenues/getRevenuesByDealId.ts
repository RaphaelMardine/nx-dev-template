import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { lambdaApi } from '../../api';

export interface RevenueListResponse {
  id: string
  dealId: string
  expectedPayDate: string
  amount: number
}

export function UseQueryRevenuesByDealId(dealId: string | undefined): UseQueryResult<{
  data: RevenueListResponse[];
}> {
  return useQuery({
    queryKey: ['RevenuesByDealId', dealId],
    queryFn: () => lambdaApi(`revenues/by-deal/${dealId}`),
  });
}
