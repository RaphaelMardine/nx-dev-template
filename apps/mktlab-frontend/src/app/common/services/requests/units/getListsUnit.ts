import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { lambdaApi } from '../../api';

export interface ResultUnitList {
  result: IUnitList[];
  page: number;
  totalPages: number;
}

export interface IUnitList {
  id: string;
  cofId: string;
  companyId: string;
  headquarterId: string;
  pipefyId?: string;
  salesforceId: string;
  attributionModel: string;
  startDate: string;
  sapId: string;
  status: string;
  primaryPartnerId: string;
  assignatureContractDate: string;
  franchiseFee: number;
  franchiseTrainingFee: number;
  company: Company;
  entity: Entity;
  partners: Partner[];
}

export interface Company {
  businessType: string;
  cnae: string;
  entityId: string;
  foundingDate: string;
  id: string;
  legalName: string;
  primaryAddressId: string;
  taxRegime: string;
  tradingName: string;
}

export interface Entity {
  id: string;
  document: string;
  documentType: string;
  primaryContactId: string;
}

export interface Partner {
  id: string;
  birthday: string;
  entityId: string;
  name: string;
  positionId: string;
  primaryAddressId: string;
}

export function UseQueryUnitList(
  page: number,
  name: string,
  active: boolean
): UseQueryResult<{
  data: ResultUnitList;
}> {
  return useQuery({
    queryKey: ['unitList', page, name, active],
    queryFn: () =>
      lambdaApi(`franchise/aggregated/list?page=${page}&name=${name}&status=${active ? 'ACTIVE' : 'INACTIVE'}`),
  });
}
