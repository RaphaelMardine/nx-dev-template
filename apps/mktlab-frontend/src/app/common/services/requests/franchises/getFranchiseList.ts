import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { lambdaApi } from '../../api';

export interface ResultFranchiseList {
  result: AggregatedFranchiseList[]
}

export interface AggregatedFranchiseList {
  id: string
  cofId: string
  companyId: string
  headquarterId: string
  pipefyId: string
  salesforceId: string
  attributionModel: string
  startDate: string
  sapId: string
  status: string
  primaryPartnerId: string
  assignatureContractDate: string
  franchiseFee: number
  franchiseTrainingFee: number
  bankingProviderId: string
  company: Company
  entity: Entity
  partners: Partner[]
}

export interface Company {
  businessType: string
  cnae: string
  entityId: string
  foundingDate: string
  id: string
  legalName: string
  primaryAddressId: string
  taxRegime: string
  tradingName: string
}

export interface Entity {
  id: string
  document: string
  documentType: string
  primaryContactId: string
}

export interface Partner {
  id: string
  entityId: string
  companyId: string
  name: string
  positionId: string
  primaryAddressId: string
}


export function useQueryFranchiseList(): UseQueryResult<{
  data: ResultFranchiseList;
}> {
  return useQuery({
    queryKey: ['franchiseList'],
    queryFn: () =>
      lambdaApi(
        `/franchise/aggregated/list`
      ),
  });
}
