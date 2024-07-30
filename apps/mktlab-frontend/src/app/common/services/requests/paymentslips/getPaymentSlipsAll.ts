import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { lambdaApi } from '../../api';
import { IFiltersFinance } from '../../../types/hooks-forms';

export interface Result {
  id: string;
  parties: Party[];
  paymentSlips: PaymentSlips;
}

export interface Party {
  id: string;
  customerName: string;
  franchiseName: string;
  type: string;
}

export interface PaymentSlips {
  status: string;
  bankingProviderId: string;
  dealId: string;
  dueDate: string;
  closingDate: string;
  totalAmount: string;
  paidAt: Date | null;
}

export function useQueryPaymentSlipsAll(
  filters: IFiltersFinance
): UseQueryResult<{
  data: Result[];
}> {
  const {
    customer,
    dueDate,
    endDatePeriod,
    maxTotalAmount,
    minTotalAmount,
    startDatePeriod,
    status,
    unit,
  } = filters;
  return useQuery({
    queryKey: ['ListPaymentSlips', filters],
    queryFn: () =>
      lambdaApi(
        `payment-slips?page=1${customer ? '&customer=' + customer : ''}${
          dueDate ? '&dueDate=' + dueDate : ''
        }${endDatePeriod ? '&endDatePeriod=' + endDatePeriod : ''}${
          maxTotalAmount ? '&maxTotalAmount=' + maxTotalAmount : ''
        }${minTotalAmount ? '&minTotalAmount=' + minTotalAmount : ''}${
          startDatePeriod ? '&startDatePeriod=' + startDatePeriod : ''
        }${status ? '&status=' + status : ''}${unit ? '&unit=' + unit : ''}`
      ),
  });
}
