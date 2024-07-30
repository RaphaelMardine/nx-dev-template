'use client';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Progress,
  Tabs,
  TabsContent,
} from '@v4company/ui-components';
import { BreadcrumbCustomers } from '../components/breadcrumbCustomers';
import { ReactNode } from 'react';
import SearchBar from '../../common/components/SearchBar';
import { CustomersTable } from '../components/customersTable';
import { useParams } from 'next/navigation';
import { UseQueryCustomersList } from '../../common/services/requests/customers/getCustomersList';

const Container = ({ children }: { children: ReactNode }) => (
  <div className="w-full p-5 border border-solid h-max">{children}</div>
);

export default function Customers() {
  const { id } = useParams();

  const { data } = UseQueryCustomersList(1, id as string);

  const customersActive = data?.data?.result.filter(
    (unit) => unit.status === 'ACTIVE'
  );
  const customersInactive = data?.data?.result.filter(
    (unit) => unit.status === 'INACTIVE'
  );

  return (
    <div className="px-8 pt-20 bg-center first-line:bg-center text-ellipsis">
      <div className="pb-6" />
      <div className="flex flex-col w-full border border-solid bg-muted/40">
        <div className="px-8 pt-20 pb-20 bg-center first-line:bg-center text-ellipsis">
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
            <div className="flex gap-8">
              <Card
                className="w-2/3"
                x-chunk="dashboard-05-chunk-0"
              >
                <CardHeader className="pb-3">
                  <CardTitle>Gestão de clientes</CardTitle>
                  <CardDescription className="max-w-lg leading-relaxed text-balance">
                    Nesta pagina você poderá encontrar todos os clientes da
                    unidade selecionada.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card
                x-chunk="dashboard-05-chunk-1"
                className="w-1/3"
              >
                <CardHeader className="pb-2">
                  <CardDescription>Novos clientes</CardDescription>
                  <CardTitle className="text-2xl">
                    {customersActive?.length}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    Clientes ativos na unidade
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress
                    value={100}
                    aria-label="25% increase"
                  />
                </CardFooter>
              </Card>
              <Card
                x-chunk="dashboard-05-chunk-2"
                className="w-1/3"
              >
                <CardHeader className="pb-2">
                  <CardDescription>Clientes inativos</CardDescription>
                  <CardTitle className="text-2xl">
                    {customersInactive?.length}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    Clientes inativos na unidade
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress
                    value={100}
                    aria-label="25% increase"
                  />
                </CardFooter>
              </Card>
            </div>
            <Container>
              <Tabs defaultValue="active">
                <div className="flex justify-between">
                  <h2 className="font-bold text-2 xl">
                    Gerenciamento de clientes
                  </h2>
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
      </div>
    </div>
  );
}
