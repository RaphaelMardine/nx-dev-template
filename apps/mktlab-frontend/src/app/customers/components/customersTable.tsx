'use client';

import { DataTable } from '../../common/components/DataTable/data-table';
import { useDataTable } from '../../common/hooks/useDataTable';
import { useEffect, useMemo, useState } from 'react';
import { GetCustomersColumn } from './customerTableColumns';
import { ICustomersList } from '../../common/services/requests/customers/getCustomersByFranchiseId';

export function CustomersTable({ data }: { data: ICustomersList[] }) {
  const [pageCount, setPageCount] = useState(1); 

  useEffect(() => {
    setPageCount(Math.ceil(data.length / 10));

  }, [data]);

  const columns = useMemo(() => GetCustomersColumn(), []);

  const { table } = useDataTable({
    data,
    columns,
    pageCount,
  });

  return (
    <div className="w-full space-y-2.5 overflow-auto">
      <DataTable table={table} />
    </div>
  );
}
