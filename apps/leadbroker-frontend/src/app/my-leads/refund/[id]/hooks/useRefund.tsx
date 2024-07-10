'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
} from '@tanstack/react-query';
import { getMyLeadRefund } from '../../../../../common/services/requests/getMyLead';
import { MyLeadResponse } from '../../../../../common/types';

const RefundContext = createContext(
  {} as {
    lead?: MyLeadResponse;
    refetch: (
      options?: RefetchOptions | undefined
    ) => Promise<QueryObserverResult<MyLeadResponse, Error>>;
  }
);

const RefundProvider = ({
  children,
  id,
}: {
  children: ReactNode;
  id: string;
}) => {
  const { data: lead, refetch } = useQuery({
    queryKey: ['get-my-lead', id],
    queryFn: async () => {
      const response = await getMyLeadRefund(id as string);
      return response.data as MyLeadResponse;
    },
  });

  return (
    <RefundContext.Provider value={{ lead, refetch }}>
      {children}
    </RefundContext.Provider>
  );
};

function useRefund() {
  return useContext(RefundContext);
}

export { RefundProvider, RefundContext, useRefund };
