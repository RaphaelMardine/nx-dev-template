'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import { TransactionsResponse } from '../../../../common/types';
import { Transaction, columns } from './columns';
import { DataTable } from './data-table';
import { TransactionDetailsDrawer } from '../TransactionDetailsDrawer';
import { PaginationState, SortingState } from '@tanstack/react-table';

function getData(transactions: TransactionsResponse[]): Transaction[] {
  if (!transactions?.length) return [];

  const data: Transaction[] = transactions?.map((transaction) => {
    return {
      id: transaction._id,
      amount: transaction.amount,
      status: transaction.status,
      type: { type: transaction.type, method: transaction.depositMethod },
      createdAt: transaction.createdAt,
      author: {
        name: transaction.user.name,
        picture: transaction.user.picture,
      },
    };
  });
  return data;
}

interface WalletTableProps {
  transactions: TransactionsResponse[];
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

export const WalletTable = ({
  transactions,
  pageCount,
  pagination,
  setPagination,
  sorting,
  setSorting,
}: WalletTableProps) => {
  const [transactionDrawerOpen, setTransactionDrawerOpen] = useState(false);
  const [transaction, setTransaction] = useState<TransactionsResponse | null>(
    null
  );
  const data = getData(transactions);

  const setRowData = (row: Transaction) => {
    transactions?.forEach((transaction) => {
      if (transaction._id === row.id) {
        setTransaction(transaction);
      }
    });
    setTransactionDrawerOpen(true);
  };

  return (
    <div className="w-full py-10 mx-auto">
      <DataTable
        columns={columns}
        data={data}
        handleRowClick={(row) => setRowData(row)}
        pageCount={pageCount}
        pagination={pagination}
        setPagination={setPagination}
        sorting={sorting}
        setSorting={setSorting}
      />
      {transaction && (
        <TransactionDetailsDrawer
          transactionDrawerOpen={transactionDrawerOpen}
          setTransactionDrawerOpen={setTransactionDrawerOpen}
          transaction={transaction as TransactionsResponse}
        />
      )}
    </div>
  );
};
