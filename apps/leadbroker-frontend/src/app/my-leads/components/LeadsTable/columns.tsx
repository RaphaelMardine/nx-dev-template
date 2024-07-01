'use client';

import { ColumnDef } from '@tanstack/react-table';
import { convertCentsToBRL, formatDate } from '@v4company/utils';
import { getInitialAvatar } from '../../utils';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
} from '@v4company/ui-components';
import { LeadStatus } from '../../../../common/types';
import { badge } from '../../constants';
import { ArrowUpDown } from 'lucide-react';

export type Lead = {
  id: string;
  company: string;
  revenue: string;
  status: string;
  type: string;
  tel?: string;
  boughtAt?: Date;
  winner: { name: string; picture: string };
  realValue: number;
  // types for the refund table
  refundCreatedAt?: Date;
  refundRequest?: { name?: string; picture?: string };
  refundStatus?: string;
};

export const columnsLeads: ColumnDef<Lead>[] = [
  {
    accessorKey: 'company',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nome
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: (row) => row.getValue(),
  },
  {
    accessorKey: 'tel',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Telefone
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: (row) => row.getValue(),
  },
  {
    accessorKey: 'revenue',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Faturamento
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: (row) => row.getValue(),
  },
  {
    accessorKey: 'winner',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Arrematador
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: (row) => (
      <div className="flex items-center gap-2">
        <Avatar className="w-6 h-6">
          <AvatarImage
            src={row.getValue<{ picture: string }>()?.picture}
            alt="Imagem do autor da transação"
          />
          <AvatarFallback className="text-xs">
            {getInitialAvatar(row.getValue<{ name: string }>()?.name || '')}
          </AvatarFallback>
        </Avatar>
        <p className="text-sm font-normal">
          {row.getValue<{ name: string }>()?.name}
        </p>
      </div>
    ),
  },
  {
    accessorKey: 'type',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Tipo
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: (row) => row.getValue(),
  },
  {
    accessorKey: 'boughtAt',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Comprado em
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: (row) => formatDate(new Date(row.getValue() as string)),
  },
  {
    accessorKey: 'realValue',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Valor
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: (row) => (
      <div className="text-right">
        {convertCentsToBRL((row.getValue() as number) || 0)}
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Status
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: (row) => (
      <Badge
        className="items-center flex-1 gap-1 px-2 py-1 text-xs rounded-full whitespace-nowrap"
        variant={badge[row.getValue() as LeadStatus]?.variant}
      >
        {badge[row.getValue() as LeadStatus]?.icon}
        {badge[row.getValue() as LeadStatus]?.label}
      </Badge>
    ),
  },
];

export const columnsRefunds: ColumnDef<Lead>[] = [
  {
    accessorKey: 'company',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nome
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: (row) => row.getValue(),
  },
  {
    accessorKey: 'refundRequest',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Solicitante
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: (row) => (
      <div className="flex items-center gap-2">
        <Avatar className="w-6 h-6">
          <AvatarImage
            src={row.getValue<{ picture: string }>()?.picture}
            alt="Imagem do autor da transação"
          />
          <AvatarFallback className="text-xs">
            {getInitialAvatar(row.getValue<{ name: string }>()?.name || '')}
          </AvatarFallback>
        </Avatar>
        <p className="text-sm font-normal">
          {row.getValue<{ name: string }>()?.name}
        </p>
      </div>
    ),
  },
  {
    accessorKey: 'refundCreatedAt',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Data da solicitação
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: (row) => formatDate(new Date(row.getValue() as string)),
  },
  {
    accessorKey: 'realValue',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Valor
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: (row) => convertCentsToBRL((row.getValue() as number) || 0),
  },
  {
    accessorKey: 'refundStatus',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Status
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: (row) => (
      <Badge
        className="items-center flex-1 gap-1 px-2 py-1 text-xs rounded-full whitespace-nowrap"
        variant={badge[row.getValue() as LeadStatus]?.variant}
      >
        {badge[row.getValue() as LeadStatus]?.icon}
        {badge[row.getValue() as LeadStatus]?.label}
      </Badge>
    ),
  },
];
