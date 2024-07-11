'use client';

import * as React from 'react';
import { type ColumnDef } from '@tanstack/react-table';
import { Badge } from '@v4company/ui-components';
import CustomersRowActions from './customersRowActions';
import { DataTableColumnHeader } from '../../common/components/DataTable/data-table-column-header';
import { useRouter } from 'next/navigation';
import { ICustomersList } from '../../common/services/requests/customers/getCustomersByFranchiseId';

export function GetCustomersColumn(): ColumnDef<ICustomersList>[] {
  const router = useRouter();

  return [
    {
      accessorKey: 'tradingName',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Cliente"
        />
      ),
      cell: ({ row }) => {
        return (
          <div
            className="flex space-x-2"
            onClick={() => router.push(`/units/${row.original.id}?unitId=${row.original.franchiseId}`)}
          >
            <span className="max-w-[31.25rem] truncate font-medium">
              {row.original.name || row.original.tradingName}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: 'legalName',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Nome legal"
        />
      ),
      cell: ({ row }) => {
        return (
          <div
            className="flex space-x-2"
            onClick={() => router.push(`/units/${row.original.id}?unitId=${row.original.franchiseId}`)}
          >
            <span className="max-w-[31.25rem] truncate font-medium">
              {row.original.legalName}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: 'status',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Status"
        />
      ),
      cell: ({ row }) => {
        const status = row?.original?.status;

        if (!status) return null;

        return (
          <div
            className="flex space-x-2"
            onClick={() => router.push(`/units/${row.original.id}?unitId=${row.original.franchiseId}`)}
          >
            <span className="max-w-[31.25rem] truncate font-medium">
            {status === 'ACTIVE' ? (
              <Badge variant={'success'}>Ativo</Badge>
            ) : (
              <Badge variant={'destructive'}>Desativada</Badge>
            )}            </span>
          </div>
        );
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const unitId = row.original.id;
        const status = row.original.status;

        return (
          <CustomersRowActions
            unitId={unitId}
            status={status}
            unit={row.original}
          />
        );
      },
    },
  ];
}
