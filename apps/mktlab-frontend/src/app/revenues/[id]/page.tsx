'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Tabs,
  TabsList,
  TabsTrigger,
} from '@v4company/ui-components';
import { Overview } from './components/overview';
import { RecentRevenues } from './components/listRevenues';
import { useParams } from 'next/navigation';
import { UseQueryRevenuesByDealId } from '../../common/services/requests/revenues/getRevenuesByDealId';
import { UseQueryRevenuesShareByDealId } from '../../common/services/requests/revenues/getRevenuesShareByDealId';

import { convertCentsToBRL } from '@v4company/utils';
import { ReactNode } from 'react';
import { Slash } from 'lucide-react';

const Container = ({ children }: { children: ReactNode }) => (
    <div className="w-full p-5 bg-white border border-solid h-max border-color-gray-default">
      {children}
    </div>
  );

export default function RevenuesPage() {
    const {id} = useParams();

    const { data: DataRevenueByDeal } = UseQueryRevenuesByDealId(id as string);

    const { data } = UseQueryRevenuesShareByDealId(id as string);

    const predictedAmount = data?.data.reduce((acc, item) => acc + item.centsAmount, 0);
    const accomplishedAmount = data?.data.filter(item => {
        const expectedPayDate = new Date(item.expectedPayDate);
        return expectedPayDate < new Date()
    }
).reduce((acc, item) => acc + item.centsAmount, 0);

  return (
    <div className="min-h-screen px-8 pt-20 bg-center first-line:bg-center text-ellipsis">
      <Breadcrumb className="pb-6 font-sans">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink path="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage className="font-sans">Receita</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
      <Container>
      <div className="flex-col hidden md:flex">
        <div className="flex-1 p-8 pt-6 space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">
                  Receita prevista
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{predictedAmount ? convertCentsToBRL(predictedAmount) : ''}</div>
                <p className="text-xs text-muted-foreground">
                  Caso todas as receitas sejam pagas
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">
                  Expectativa de receita
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-muted-foreground"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle
                    cx="9"
                    cy="7"
                    r="4"
                  />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{accomplishedAmount ? convertCentsToBRL(accomplishedAmount) : ""}</div>
                <p className="text-xs text-muted-foreground">
                  Deveria ter sido recebido até o momento
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Receita alcançada</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-muted-foreground"
                >
                  <rect
                    width="20"
                    height="14"
                    x="2"
                    y="5"
                    rx="2"
                  />
                  <path d="M2 10h20" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+{convertCentsToBRL(0)}</div>
                <p className="text-xs text-muted-foreground">
                  Valor pago até o momento
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">
                  Pendente recebimento
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-muted-foreground"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+{accomplishedAmount ? convertCentsToBRL(accomplishedAmount) : ""}</div>
                <p className="text-xs text-muted-foreground">
                  Valor necessário para estar em dia
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview revenues={DataRevenueByDeal?.data}/>
              </CardContent>
            </Card>
            <Card className="col-span-3">
                <CardHeader>
                  <div className="flex items-center justify-between w-full">
                    <CardTitle>Receita</CardTitle>
                    <Tabs defaultValue="cashin" className="w-auto">
                      <TabsList>
                        <TabsTrigger value="cashin">Cash-in</TabsTrigger>
                        <TabsTrigger value="cashout" disabled>Cash-out</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                  <CardDescription>
                    Você tem {data?.data?.length} linhas de receita esperadas.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentRevenues revenues={data?.data} />
                </CardContent>
            </Card>
          </div>
        </div>
      </div>
        </Container>
    </div>
  );
}
