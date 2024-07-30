'use client';

import * as React from 'react';
import { type ColumnDef } from '@tanstack/react-table';
import { Badge } from '@v4company/ui-components';
import UnitRowActions from './unitRowActions';
import { DataTableColumnHeader } from '../../common/components/DataTable/data-table-column-header';
import { convertCentsToBRL } from '@v4company/utils';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { IUnitList } from '../../common/services/requests/units/getListsUnit';

export function GetColumnsUnit(): ColumnDef<IUnitList>[] {
  const router = useRouter();

  return [
    {
      accessorKey: 'company',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Unidade franqueada"
        />
      ),
      cell: ({ row }) => {
        return (
          <div
            className="flex space-x-2"
            onClick={() => router.push(`/customers/${row.original.id}`)}
          >
            <span className="max-w-[31.25rem] truncate font-medium">
              {row.original.company.tradingName}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: 'franchiseFee',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Fee"
        />
      ),
      cell: ({ row }) => {
        return (
          <div
            className="flex space-x-2"
            onClick={() => router.push(`/customers/${row.original.id}`)}
          >
            <span className="max-w-[31.25rem] truncate font-medium">
              {convertCentsToBRL(row.getValue('franchiseFee'))}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: 'startDate',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Início da franquia"
        />
      ),
      cell: ({ row }) => {
        const startDate = row?.original?.startDate;

        return (
          <div
            className="flex space-x-2"
            onClick={() => router.push(`/customers/${row.original.id}`)}
          >
            <span className="max-w-[31.25rem] truncate font-medium">
              {format(startDate, 'dd/MM/yyyy')}
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
            className="flex w-[6.25rem] items-center"
            onClick={() => router.push(`/customers/${row.original.id}`)}
          >
            {status === 'ACTIVE' ? (
              <Badge variant={'success'}>Ativo</Badge>
            ) : (
              <Badge variant={'destructive'}>Desativada</Badge>
            )}
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return Array.isArray(value) && value.includes(row.getValue(id));
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const unitId = row.original.id;

        return (
          <UnitRowActions
            unitId={unitId}
          />
        );
      },
    },
  ];
}
