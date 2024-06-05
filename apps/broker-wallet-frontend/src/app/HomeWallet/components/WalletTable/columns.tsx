'use client';

import { ColumnDef } from '@tanstack/react-table';
import { convertCentsToBRL, formatDate } from '@v4company/utils';
import { getInitialAvatar, getTypeTransaction } from '../../utils';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
} from '@v4company/ui-components';
import { TransactionStatus } from '../../../../common/types';
import { badge } from '../../constants';
import { ArrowUpDown } from 'lucide-react';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Transaction = {
  id: string;
  type: { type: string; method?: string };
  author: { name: string; picture?: string };
  createdAt: Date;
  status: string;
  amount: number;
};

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'type',
    header: 'Tipo',
    cell: (row) => getTypeTransaction(row.getValue()),
  },
  {
    accessorKey: 'author',
    header: 'Autor',
    cell: (row) => (
      <div className="flex items-center gap-2">
        <Avatar className="w-6 h-6">
          <AvatarImage
            src={row.getValue<{ picture: string }>().picture}
            alt="Imagem do autor da transação"
          />
          <AvatarFallback className="text-xs">
            {getInitialAvatar(row.getValue<{ name: string }>().name)}
          </AvatarFallback>
        </Avatar>
        <p className="text-sm font-normal">
          {row.getValue<{ name: string }>().name}
        </p>
      </div>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Data
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: (row) => formatDate(new Date(row.getValue() as string)),
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
        className="items-center flex-1 gap-1 px-2 py-1 text-xs rounded-full"
        variant={badge[row.getValue() as TransactionStatus]?.variant}
      >
        {badge[row.getValue() as TransactionStatus]?.icon}
        {badge[row.getValue() as TransactionStatus]?.label}
      </Badge>
    ),
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <ArrowUpDown className="w-4 h-4 mr-2" />
          Valor
        </Button>
      );
    },
    cell: (row) => (
      <div
        className={`text-right ${
          Number(row.getValue()) < 0 ? 'text-destructive' : ''
        }`}
      >
        {convertCentsToBRL(row.getValue() as number)}
      </div>
    ),
  },
];
