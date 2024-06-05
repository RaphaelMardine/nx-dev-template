'use client';

import * as React from 'react';


import { getColumns } from '../components/unitTableColumns';
import { DataTable } from '../../common/components/DataTable/data-table';
import { useDataTable } from '../../common/hooks/useDataTable';
import { IUnitList } from '../../common/services/requests/getListsUnit';

export function UnitTable({ data }: { data: IUnitList[] }) {
  const pageCount = 5;
  // Memorizando as colunas para que elas não sejam renderizadas novamente em cada renderização.
  const columns = React.useMemo(() => getColumns(), []);

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
