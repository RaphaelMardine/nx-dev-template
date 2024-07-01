'use client';

import { Dispatch, SetStateAction } from 'react';
import { MyLeadResponse } from '../../../../common/types';
import { Lead, columnsLeads, columnsRefunds } from './columns';
import { DataTable } from './data-table';
import { PaginationState, SortingState } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';

function getData(leads: MyLeadResponse[]): Lead[] {
  if (!leads?.length) return [];

  const data: Lead[] = leads?.map((lead) => {
    return {
      id: lead._id,
      company: lead.lead.company,
      revenue: lead.lead.revenue,
      type: lead.packId ? 'Pack' : 'Lead',
      tel: lead.lead.tel,
      status: lead.steps || 'IN_PROSPECTING',
      boughtAt: lead.winner.boughtAt,
      winner: { name: lead.winner.name, picture: lead.winner.picture },
      realValue: lead.winner.realValue,
      refundCreatedAt: lead?.refund?.createdAt,
      refundRequest: {
        name: lead?.refund?.whoRequest.name,
        picture: lead?.refund?.whoRequest.picture,
      },
      refundStatus: lead?.refund?.status,
    };
  });
  return data;
}

interface WalletTableProps {
  leads: MyLeadResponse[];
  pageCount?: number;
  pagination?: PaginationState;
  setPagination?: Dispatch<
    SetStateAction<{
      pageIndex: number;
      pageSize: number;
    }>
  >;
  sorting?: SortingState;
  setSorting?: Dispatch<SetStateAction<SortingState>>;
  tab?: string;
}

export const LeadsTable = ({
  leads,
  pageCount,
  pagination,
  setPagination,
  sorting,
  setSorting,
  tab,
}: WalletTableProps) => {
  const data = getData(leads);
  const router = useRouter();
  const columns = tab === 'LEADS_PURCHASED' ? columnsLeads : columnsRefunds;

  return (
    <div className="w-full py-4 mx-auto">
      <DataTable
        columns={columns}
        data={data}
        handleRowClick={(row) => router.push(`/my-leads/${row.id}`)}
        pageCount={pageCount}
        pagination={pagination}
        setPagination={setPagination}
        sorting={sorting}
        setSorting={setSorting}
      />
    </div>
  );
};
