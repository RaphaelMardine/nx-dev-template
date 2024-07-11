import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { lambdaApi } from '../../api';

interface ResultDealList {
  result: DealsList[];
  totalPages: number;
}

export interface DealsList {
  id: string
  billCustomerAcquisitionCost: boolean
  closingDay: number
  contractId: string
  createdAt: string
  dueDay: number
  endDate: string
  expireDay: number
  paymentMethod: string
  startDate: string
  totalAmount: string
  type: string
  bankingProviderId: string
}


export function UseQueryDealByCustomerId(customerId: string, franchiseId: string): UseQueryResult<{
  data: ResultDealList;
}> {
  return useQuery({
    queryKey: ['dealsByCustomer', customerId, franchiseId],
    queryFn: () => lambdaApi(`deals?&customerId=${customerId}&franchiseId=${franchiseId}&page=1`),
  });
}
