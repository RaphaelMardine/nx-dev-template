'use client';
import {
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@v4company/ui-components';
import { BreadcrumbCustomers } from '../components/breadcrumbCustomers';
import { CardsCustomers } from '../components/cardsCustomers';
import { Download } from 'lucide-react';
import { ReactNode, useState } from 'react';
import SearchBar from '../../common/components/SearchBar';
import { UseQueryUnitList } from '../../common/services/requests/units/getListsUnit';
import { CustomersTable } from '../components/customersTable';
import { UseQueryCustomersList } from '../../common/services/requests/customers/getCustomersByFranchiseId';
import { useParams } from 'next/navigation';

const Container = ({ children }: { children: ReactNode }) => (
  <div className="w-full p-5 bg-white border border-solid h-max border-color-gray-default">
    {children}
  </div>
);

const FlexBox = ({ children }: { children: ReactNode }) => (
  <div className="flex gap-10 ">{children}</div>
);

export default function Customers() {
  const { id } = useParams()

  const { data } = UseQueryCustomersList(1, id as string);

  const customersActive = data?.data?.result.filter(
    (unit) => unit.status === 'ACTIVE'
  );
  const customersInactive = data?.data?.result.filter(
    (unit) => unit.status === 'INACTIVE'
  );

  return (
    <div className="min-h-screen px-8 pt-20 bg-center first-line:bg-center text-ellipsis">
      <BreadcrumbCustomers />
      <div className="flex justify-between py-8">
        <h1 className="text-4xl font-bold">Visão geral</h1>
        <Button
          className="font-bold rounded-xl"
          disabled
        >
          Novo cliente
        </Button>
      </div>
      <div className="flex flex-col gap-8">
        <Container>
          <FlexBox>
            <CardsCustomers
              quantity={customersActive?.length || 0}
              title="Clientes ativos"
            />
            <CardsCustomers
              quantity={customersInactive?.length || 0}
              title="Clientes inativados"
            />
            <CardsCustomers
              title="Novos clientes"
              quantity={customersActive?.length || 0}
              contentBadge={`+ 100%`}
              typeBadge="success"
            />
          </FlexBox>
        </Container>
        <Container>
          <Tabs defaultValue="active">
            <div className="flex justify-between">
              <h2 className="font-bold text-2 xl">Gerenciamento de clientes</h2>
              <div className="flex">
                <Button
                  disabled
                  variant={'link'}
                  className="text-[#2E1C87] font-bold text-sm underline capitalize gap-2"
                >
                  <Download
                    width={16}
                    height={16}
                  />{' '}
                  Exportar relatório
                </Button>
                <TabsList>
                  <TabsTrigger
                    value="active"
                  >
                    Ativas
                  </TabsTrigger>
                  <TabsTrigger
                    value="inactive"
                  >
                    Inativas
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>
            <div className="flex justify-between py-6">
              <SearchBar
                placeholder="Busque por unidade"
                className="pr-4 w-80 pl-9"
              />
            </div>
            <TabsContent value="active">
              {data?.data && <CustomersTable data={data?.data?.result} />}
            </TabsContent>
            <TabsContent value="inactive">
              {data?.data && <CustomersTable data={data?.data?.result} />}
            </TabsContent>
          </Tabs>
        </Container>
      </div>
    </div>
  );
}
