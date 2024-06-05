'use client';

import * as React from 'react';
import { type ColumnDef } from '@tanstack/react-table';
import { Badge } from '@v4company/ui-components';
import UnitRowActions from './unitRowActions';
import { DataTableColumnHeader } from '../../common/components/DataTable/data-table-column-header';
import { IUnitList } from '../../common/services/requests/getListsUnit';

export function getColumns(): ColumnDef<IUnitList>[] {
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
          <div className="flex space-x-2">
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
          <div className="flex space-x-2">
            <span className="max-w-[31.25rem] truncate font-medium">
              {row.getValue('franchiseFee')}
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
        return (
          <div className="flex space-x-2">
            <span className="max-w-[31.25rem] truncate font-medium">
              {row.getValue('startDate')}
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
          <div className="flex w-[6.25rem] items-center">
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
        const status = row.original.status;

        return (
          <UnitRowActions
            unitId={unitId}
            status={status}
          />
        );
      },
    },
  ];
}
