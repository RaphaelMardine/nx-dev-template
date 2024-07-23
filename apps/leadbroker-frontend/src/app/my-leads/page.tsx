'use client';

import { Container, Section } from '@v4company/ui-components';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMyLeads } from '../../common/services';
import { SortingState } from '@tanstack/react-table';
import { useSearchParams } from 'next/navigation';
import {
  BreadcrumbMyLeads,
  DownloadCsv,
  LeadsTable,
  TabsMyLeads,
} from './components';

export default function MyLeads() {
  const search = useSearchParams();
  const [tab, setTab] = useState<'LEADS_PURCHASED' | 'LEADS_REFUNDED'>(
    (search.get('tab') as 'LEADS_PURCHASED' | 'LEADS_REFUNDED') ||
      'LEADS_PURCHASED'
  );
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);

  const { data: myLeads } = useQuery({
    queryKey: ['get-my-leads', tab, pagination, sorting],
    queryFn: async () => {
      const response = await getMyLeads(
        tab,
        pagination.pageIndex + 1,
        pagination.pageSize,
        sorting
      );
      return response;
    },
  });
  return (
    <Container>
      <BreadcrumbMyLeads />
      <Section>
        <h3>Meus Leads</h3>

        <div className="flex justify-between">
          <TabsMyLeads
            tab={tab}
            setTab={setTab}
          />
          <DownloadCsv data={myLeads?.data?.data || []} />
        </div>
        <LeadsTable
          leads={myLeads?.data?.data || []}
          pagination={pagination}
          setPagination={setPagination}
          pageCount={myLeads?.data?.totalPages || 0}
          sorting={sorting}
          setSorting={setSorting}
          tab={tab}
        />
      </Section>
    </Container>
  );
}
