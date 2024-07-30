import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { lambdaApi } from '../../api';

interface ResultCustomersList {
    result: ICustomersList[];
    page: number;
    totalPages: number;
}

export interface ICustomersList {
  id: string;
  type: string;
  status: string; 
  franchiseId: string;
  name: string;
  legalName: string | null;
  tradingName: string | null;
  bankingProviderId: string;
  document: string;
  documentType: string;
}


export function UseQueryCustomersList(
  page: number,
  franchiseId?: string,
): UseQueryResult<{
  data: ResultCustomersList;
}> {
  return useQuery({
    queryKey: ['customerList', page, franchiseId],
    queryFn: () =>
      lambdaApi(`customer/aggregate?page=${page}&${franchiseId ? 'franchiseId=' + franchiseId : ''}`),
  });
}
