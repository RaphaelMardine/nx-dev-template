'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@v4company/ui-components';
import { Dispatch, SetStateAction, useState } from 'react';
import Image from 'next/image';
import { DataTablePagination } from './data-table-pagination';

import RobiatiTable from '../../assets/robiati_table.png';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  handleRowClick?: (row: TData) => void;
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
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageCount,
  pagination,
  setPagination,
  sorting,
  setSorting,
  handleRowClick,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    manualSorting: true,
    manualPagination: true,
    pageCount,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  return (
    <div>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table?.getRowModel()?.rows?.length ? (
              table?.getRowModel()?.rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  onClick={() => {
                    handleRowClick?.(row.original);
                  }}
                >
                  {row?.getVisibleCells()?.map((cell) => (
                    <TableCell
                      className="px-6"
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="w-full"
                >
                  <div className="flex flex-col items-center justify-center w-full gap-4 p-4 text-center">
                    <Image
                      width={208}
                      height={208}
                      src={RobiatiTable}
                      alt="Tabela Robiati"
                    />
                    <p className="text-xl font-bold text-red-800">
                      Nenhuma transação encontrada
                    </p>
                    <div>
                      <p>
                        Ainda não foram realizadas transações pela sua unidade.
                      </p>
                      <p>Comece realizando um depósito!</p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end py-4 space-x-2">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
