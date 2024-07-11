import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { lambdaApi } from '../../api';

export interface IGetDealResponse {
  id: string
  totalAmount: number
  type: string
  contractId: string
  paymentMethod: string
  startDate: string
  endDate: string
  bankingProviderId: string
  expectedSuccessFee: string
  billCustomerAcquisitionCost: boolean
  dueDay: number
  closingDay: number
  expireDay: number
  status: string
  franchiseSplit: FranchiseSplit
  headquarterSplit: HeadquarterSplit
  dealItems: DealItem[]
}

export interface FranchiseSplit {
  id: string
  amountCents: number
  companyId: string
  dealId: string
  expectedPercentage: number
  companyType: string
}

export interface HeadquarterSplit {
  id: string
  amountCents: number
  companyId: string
  dealId: string
  expectedPercentage: number
  companyType: string
}

export interface DealItem {
  id: string
  name: string
  paymentType: string
  priceCents: number
  dealId: string
}


export function UseQueryDealById(dealId: string | undefined): UseQueryResult<{
  data: IGetDealResponse;
}> {
  return useQuery({
    queryKey: ['unitById', dealId],
    queryFn: () => lambdaApi(`deal/${dealId}`),
  });
}
