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
  Separator,
  Skeleton,
  Tabs,
  TabsContent,
} from '@v4company/ui-components';
import { ArrowRight } from 'lucide-react';
import { UseQueryDealById } from '../../common/services/requests/deals/getDealById';
import { useState } from 'react';
import {
  convertCentsToBRL,
  formatDate,
  formatPaymentMethod,
} from '@v4company/utils';
import { useRouter } from 'next/navigation';
import {
  Result,
  useQueryPaymentSlipsAll,
} from '../../common/services/requests/paymentslips/getPaymentSlipsAll';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schemaFilters } from '../hooks/zodValidation';
import { IFiltersFinance } from '../../common/types/hooks-forms';
import { differenceInMonths } from 'date-fns';
import { UseQueryUnitList } from '../../common/services/requests/units/getListsUnit';
import { useQueryFranchiseList } from '../../common/services/requests/franchises/getFranchiseList';
import { FilterFinance } from './FinanceTable';
import { TabFinanceTable } from './TabFinanceTable';
import { TabUnitsTable } from './TabUnitsTable';
import { UseQueryCustomersList } from '../../common/services/requests/customers/getCustomersList';

export function FinanceOverview() {
  const [dealSelected, setDealSelected] = useState<string>('');

  let totalAmount = 0;
  let expectedAmount = 0;
  let monthsByDealId = 0;

  const router = useRouter();

  const formFilter = useForm<IFiltersFinance>({
    resolver: zodResolver(schemaFilters),
  });

  const filters = formFilter.getValues();

  function convertToCents(moneyValue: string | undefined) {
    if (!moneyValue) {
      return undefined;
    }

    const valueWithoutSymbols = moneyValue?.replace('R$', '').replace(',', '.');
    const valueNumber = Number(valueWithoutSymbols);
    const valueInCents = `${Math.floor(valueNumber * 100)}`;

    return valueInCents;
  }

  const filterQuerys = {
    customer: filters?.customer,
    unit: filters.unit,
    status: filters.status,
    maxTotalAmount: convertToCents(filters?.maxTotalAmount),
    minTotalAmount: convertToCents(filters?.minTotalAmount),
    dueDate: filters.dueDate,
    startDatePeriod: filters.startDatePeriod,
    endDatePeriod: filters.endDatePeriod,
  };

  const { data: InvoiceList, isLoading } =
    useQueryPaymentSlipsAll(filterQuerys);

  // Don't is recommended use useEffect here but we need found the best way to do this
  if (InvoiceList) {
    InvoiceList.data.map((item: Result) => {
      totalAmount = totalAmount + Number(item.paymentSlips.totalAmount);
      item.paymentSlips.status === 'PAID' &&
        (expectedAmount =
          expectedAmount + Number(item.paymentSlips.totalAmount));
    });
  }

  const DealId = dealSelected
    ? dealSelected
    : InvoiceList?.data[0]?.paymentSlips.dealId;

  const { data } = UseQueryDealById(DealId);

  const DealById = data?.data;

  const startDate = DealById && new Date(DealById.startDate);
  const endDate = DealById && new Date(DealById?.endDate);

  if (data && endDate && startDate) {
    monthsByDealId = differenceInMonths(endDate, startDate);
  }

  const calcCacByDeal = (totalAmount: number, subTotal: number) => {
    const franchiseAmount = subTotal * 100;
    const percentageHeadquarter = franchiseAmount / totalAmount;
    return 100 - percentageHeadquarter;
  };

  const { data: FranchiseList } = useQueryFranchiseList();
  const { data: CustomerList } = UseQueryCustomersList(1);

  return (
    <div className="flex flex-col w-full min-h-screen bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid items-start flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid items-start gap-4 auto-rows-max md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <Card
                className="sm:col-span-2"
                x-chunk="dashboard-05-chunk-0"
              >
                <CardHeader className="pb-3">
                  <CardTitle>Acompanhamento financeiro</CardTitle>
                  <CardDescription className="max-w-lg leading-relaxed text-balance">
                    Nesta pagina você poderá encontrar todas as faturas,
                    acompanhar a inadimplência e filtrar entre unidades e
                    clientes.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card x-chunk="dashboard-05-chunk-1">
                <CardHeader className="pb-2">
                  <CardDescription>Receita prevista</CardDescription>
                  <CardTitle className="text-2xl">
                    {convertCentsToBRL(totalAmount || 0)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    Acumulo de toda receita
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress
                    value={100}
                    aria-label="25% increase"
                  />
                </CardFooter>
              </Card>
              <Card x-chunk="dashboard-05-chunk-2">
                <CardHeader className="pb-2">
                  <CardDescription>Receita realizada</CardDescription>
                  <CardTitle className="text-2xl">
                    {convertCentsToBRL(expectedAmount || 0)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    Apenas faturas pagas
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress
                    value={12}
                    aria-label="12% increase"
                  />
                </CardFooter>
              </Card>
            </div>
            <Tabs defaultValue="invoices">
              <FilterFinance
                franchiseList={FranchiseList?.data?.result}
                customerList={CustomerList?.data?.result}
                formFilter={formFilter || undefined}
              />
              <TabsContent value="invoices">
                {isLoading ? (
                  <Skeleton className="w-full h-64" />
                ) : (
                  <TabFinanceTable
                    InvoiceList={InvoiceList?.data}
                    setDealSelected={setDealSelected}
                  />
                )}
              </TabsContent>
              <TabsContent value="units">
                {FranchiseList?.data && (
                  <TabUnitsTable franchiseList={FranchiseList?.data} />
                )}
              </TabsContent>
            </Tabs>
          </div>
          <div>
            <Card
              className="overflow-hidden"
              x-chunk="dashboard-05-chunk-4"
            >
              <CardHeader className="flex flex-row items-start gap-4 bg-muted/50">
                <div className="grid gap-0.5">
                  <CardTitle className="flex items-center gap-2 text-lg group">
                    Deal #{DealById?.id.slice(0, 5)}...
                  </CardTitle>
                  <CardDescription>
                    Início: {startDate && formatDate(startDate)}
                  </CardDescription>
                  <CardDescription>
                    Fim: {endDate && formatDate(endDate)}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="p-6 text-sm">
                <div className="grid gap-3">
                  <div className="font-semibold">
                    Detalhes da negociação desta fatura
                  </div>
                  <ul className="grid gap-3">
                    {DealById?.dealItems.map((dealItems, key) => {
                      return (
                        <li
                          className="flex items-center justify-between"
                          key={key}
                        >
                          <span className="flex flex-col text-base text-muted-foreground">
                            {dealItems.name}{' '}
                            <span className="text-xs">
                              {dealItems.paymentType === 'ONE_TIME'
                                ? 'Escopo fechado'
                                : 'Recorrente'}
                            </span>
                          </span>
                          <span>
                            {convertCentsToBRL(
                              dealItems && dealItems.priceCents * monthsByDealId
                            )}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                  <Separator className="my-2" />
                  <ul className="grid gap-3">
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>
                        {convertCentsToBRL(
                          (DealById &&
                            DealById?.franchiseSplit.amountCents *
                              monthsByDealId) ||
                            0
                        )}
                      </span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Taxa da matriz
                      </span>
                      <span>
                        {convertCentsToBRL(
                          (DealById &&
                            DealById?.headquarterSplit.amountCents *
                              monthsByDealId) ||
                            0
                        )}
                      </span>
                    </li>
                    <li className="flex items-center justify-between font-semibold">
                      <span className="text-muted-foreground">Total</span>
                      <span>
                        {convertCentsToBRL(
                          (DealById &&
                            DealById?.totalAmount * monthsByDealId) ||
                            0
                        )}
                      </span>
                    </li>
                  </ul>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3">
                  <div className="font-semibold">Informações de pagamento</div>
                  <dl className="grid gap-3">
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">
                        Método de pagamento
                      </dt>
                      <dd>
                        {DealById?.paymentMethod
                          ? formatPaymentMethod(DealById?.paymentMethod)
                          : '-'}
                      </dd>
                      {}
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">
                        Dia de vencimento
                      </dt>
                      <dd>{DealById?.dueDay}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Royalties</dt>
                      <dd>
                        {DealById &&
                          calcCacByDeal(
                            DealById?.totalAmount * monthsByDealId,
                            DealById?.franchiseSplit?.amountCents *
                              monthsByDealId
                          )}
                        %
                      </dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">
                        Dia de fechamento
                      </dt>
                      <dd>{DealById?.closingDay}</dd>
                    </div>
                  </dl>
                </div>
                <Separator className="my-4" />
                  <dl className="grid">
                    <div className="flex items-center justify-between">
                      <dt className="flex items-center text-muted-foreground">
                        <Button
                          onClick={() =>
                            router.push(`/revenues/${DealById?.id}`)
                          }
                          variant={'link'}
                        >
                          Detalhes da receita desta negociação{' '}
                          <ArrowRight className="w-4 h-4" />{' '}
                        </Button>
                      </dt>
                    </div>
                  </dl>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
