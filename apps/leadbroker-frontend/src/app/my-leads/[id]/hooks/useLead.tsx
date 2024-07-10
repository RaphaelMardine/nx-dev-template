'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
} from '@tanstack/react-query';
import { getMyLead } from '../../../../common/services/requests/getMyLead';
import { MyLeadResponse } from '../../../../common/types';

const LeadContext = createContext(
  {} as {
    lead?: MyLeadResponse;
    refetch: (
      options?: RefetchOptions | undefined
    ) => Promise<QueryObserverResult<MyLeadResponse, Error>>;
  }
);

const LeadProvider = ({
  children,
  id,
}: {
  children: ReactNode;
  id: string;
}) => {
  const { data: lead, refetch } = useQuery({
    queryKey: ['get-my-lead', id],
    queryFn: async () => {
      const response = await getMyLead(id as string);
      return response.data as MyLeadResponse;
    },
  });

  return (
    <LeadContext.Provider value={{ lead, refetch }}>
      {children}
    </LeadContext.Provider>
  );
};

function useLead() {
  return useContext(LeadContext);
}

export { LeadProvider, LeadContext, useLead };
