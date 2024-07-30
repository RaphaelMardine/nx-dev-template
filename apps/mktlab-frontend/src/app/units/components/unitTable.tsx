'use client';

import * as React from 'react';

import { DataTable } from '../../common/components/DataTable/data-table';
import { useDataTable } from '../../common/hooks/useDataTable';
import { useState } from 'react';
import { GetColumnsUnit } from './unitTableColumns';
import { IUnitList } from '../../common/services/requests/units/getListsUnit';

export function UnitTable({ data }: { data: IUnitList[] }) {
  const [pageCount, setPageCount] = useState(1); 

  React.useEffect(() => {
    setPageCount(Math.ceil(data.length / 10));

  }, [data]);

  const columns = React.useMemo(() => GetColumnsUnit(), []);

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
