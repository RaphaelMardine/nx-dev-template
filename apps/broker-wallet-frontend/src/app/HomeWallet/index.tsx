'use client';

import {
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Container,
  Section,
  Tabs,
  TabsList,
  TabsTrigger,
} from '@v4company/ui-components';
import { useContext } from 'react';
import { AuthContext } from '@v4company/contexts';
import { Download, Slash } from 'lucide-react';
import { DateRangePicker, WalletHeader, WalletTable } from './components';
import { useState } from 'react';
import exportFromJSON from 'export-from-json';
import { useQuery } from '@tanstack/react-query';
import { getBalance } from '../../common/services/requests/getBalance';
import { getTransactions } from '../../common/services/requests/getTransactions';
import { typesFilter, dataToExportFromJson } from './utils';
import { DateRange } from 'react-day-picker';
import { SortingState } from '@tanstack/react-table';

export default function HomeWallet() {
  const [date, setDate] = useState<DateRange | undefined>();
  const [type, setType] = useState<string>('');
  const [flow, setFlow] = useState<'ALL' | 'INPUT' | 'OUTPUT'>('ALL');
  const { user } = useContext(AuthContext);

  const fileName = 'transações realizadas';
  const exportType = exportFromJSON.types.csv;

  const { data: balance } = useQuery({
    queryKey: ['get-balance'],
    queryFn: () => getBalance(user.unitId),
  });
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);

  const { data: transactions } = useQuery({
    queryKey: ['get-transactions', flow, type, date, pagination, sorting],
    queryFn: async () => {
      const response = await getTransactions(
        flow,
        typesFilter[flow]?.find((item) => item.key === type)?.type,
        date,
        pagination.pageIndex + 1,
        pagination.pageSize,
        sorting
      );
      return response;
    },
  });

  return (
    <Container>
      <Breadcrumb className="pt-8 font-sans">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink path="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage className="font-sans">Carteira</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Section>
        <WalletHeader balance={balance} />
      </Section>
      <Section>
        <div className="flex justify-between">
          <h3>Transações</h3>
          <DateRangePicker
            date={date}
            setDate={setDate}
          />
        </div>
        <Tabs
          defaultValue="ALL"
          className="w-full"
        >
          <TabsList>
            <TabsTrigger
              value="ALL"
              onClick={() => setFlow('ALL')}
            >
              Todas
            </TabsTrigger>
            <TabsTrigger
              value="INPUT"
              onClick={() => setFlow('INPUT')}
            >
              Entradas
            </TabsTrigger>
            <TabsTrigger
              value="OUTPUT"
              onClick={() => setFlow('OUTPUT')}
            >
              Saídas
            </TabsTrigger>
          </TabsList>
          <div className="flex items-center justify-between">
            <div className="flex max-w-full gap-2 mt-4 -mb-4 overflow-x-auto">
              {typesFilter[flow]?.map((item) => {
                return (
                  <Badge
                    variant={item.key === type ? 'default' : 'secondary'}
                    key={item.key}
                    onClick={() => setType(item.key === type ? '' : item.key)}
                    className="px-3 py-1 text-xs font-semibold rounded-full cursor-pointer whitespace-nowrap"
                  >
                    {item?.label}
                  </Badge>
                );
              })}
            </div>
            <div className="mt-4 -mb-4">
              <Button
                className="flex gap-2"
                variant="link"
                onClick={() => {
                  exportFromJSON({
                    data: dataToExportFromJson(transactions?.data?.items),
                    fileName,
                    exportType,
                  });
                }}
              >
                Exportar em CSV
                <Download size={16} />
              </Button>
            </div>
          </div>
          <WalletTable
            transactions={transactions?.data?.items || []}
            pagination={pagination}
            setPagination={setPagination}
            pageCount={transactions?.data?.lastPage || 1}
            sorting={sorting}
            setSorting={setSorting}
          />
        </Tabs>
      </Section>
    </Container>
  );
}
