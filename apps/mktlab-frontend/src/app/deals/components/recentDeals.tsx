'use client';

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Progress,
  Separator,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
} from '@v4company/ui-components';
import { ArrowRight, MoreVertical } from 'lucide-react';
import { UseQueryDealById } from '../../common/services/requests/deals/getDealById';
import { useState } from 'react';
import { convertCentsToBRL, formatDate } from '@v4company/utils';
import { useRouter } from 'next/navigation';
import { DealsList } from '../../common/services/requests/deals/getDealsByCustomer';
import { differenceInMonths } from 'date-fns';

export function RecentDeals({ Deals }: { Deals: DealsList[] | undefined }) {
  const [dealSelected, setDealSelected] = useState<string>('');

  let totalAmount = 0;
  let monthsByDealId = 0;

  if (Deals) {
    Deals.forEach((item) => {
      const months = differenceInMonths(
        new Date(item.endDate),
        new Date(item.startDate)
      );
      totalAmount += Number(item.totalAmount) * months;
    });
  }

  const DealId = dealSelected ? dealSelected : Deals?.[0]?.id;
  const today = new Date();

  const router = useRouter();

  const { data } = UseQueryDealById(DealId);

  if (data) {
    monthsByDealId = differenceInMonths(
      new Date(data?.data.endDate),
      new Date(data?.data.startDate)
    );
  }
  const DealById = data?.data;

  const startDate = DealById && new Date(DealById.startDate);
  const endDate = DealById && new Date(DealById?.endDate);

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
                  <CardTitle>Suas negociações</CardTitle>
                  <CardDescription className="max-w-lg leading-relaxed text-balance">
                    Nesta pagina você poderá encontrar todas as negociações
                    feitas com este cliente
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card
                x-chunk="dashboard-05-chunk-1"
                className="sm:col-span-2"
              >
                <CardHeader className="pb-2">
                  <CardDescription>Receita prevista</CardDescription>
                  <CardTitle className="text-2xl">
                    {convertCentsToBRL(totalAmount || 0)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    Apenas negociações ativas
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress
                    value={100}
                    aria-label="25% increase"
                  />
                </CardFooter>
              </Card>
              {/* <Card x-chunk="dashboard-05-chunk-2">
                <CardHeader className="pb-2">
                  <CardDescription>Receita realizada</CardDescription>
                  <CardTitle className="text-2xl">R$0,00</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    Até o mês atual
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress
                    value={12}
                    aria-label="12% increase"
                  />
                </CardFooter>
              </Card> */}
            </div>
            <Tabs defaultValue="week">
              <TabsContent value="week">
                <Card x-chunk="dashboard-05-chunk-3">
                  <CardHeader className="px-7">
                    <CardTitle>Negociações</CardTitle>
                    <CardDescription>
                      Recentes negociações da franquia
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Deal</TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Tipo
                          </TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Status
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Total
                          </TableHead>
                          <TableHead className="text-right">
                            Data final
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {Deals?.map((items: DealsList, key: number) => {
                          const endDate = new Date(items.endDate);
                          const startDate = new Date(items.startDate);

                          const months = differenceInMonths(
                            new Date(endDate),
                            new Date(startDate)
                          );

                          const totalAmount =
                            Number(items.totalAmount) * months;
                          const dealFinished = endDate > today;
                          return (
                            <TableRow
                              className="bg-accent"
                              key={key}
                              onClick={() => setDealSelected(items?.id)}
                            >
                              <TableCell>
                                <div className="font-medium">
                                  #{items.id.slice(0, 5)}...
                                </div>
                                <div className="hidden text-sm text-muted-foreground md:inline">
                                  {formatDate(startDate)}
                                </div>
                              </TableCell>
                              <TableCell className="hidden sm:table-cell">
                                {items.type === 'SUCCESS_FEE'
                                  ? 'Assessoria'
                                  : 'Escopo fechado'}
                              </TableCell>
                              <TableCell className="hidden sm:table-cell">
                                <Badge
                                  className="text-xs"
                                  variant={
                                    !dealFinished ? 'destructive' : 'success'
                                  }
                                >
                                  {!dealFinished ? 'Encerrado' : 'Ativo'}
                                </Badge>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {convertCentsToBRL(totalAmount)}
                              </TableCell>
                              <TableCell className="text-right">
                                {formatDate(endDate)}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
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
                <div className="flex items-center gap-1 ml-auto">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        size="icon"
                        variant="outline"
                        className="w-8 h-8"
                      >
                        <MoreVertical className="h-3.5 w-3.5" />
                        <span className="sr-only">More</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Editar</DropdownMenuItem>
                      <DropdownMenuItem>Exportar</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Excluir</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="p-6 text-sm">
                <div className="grid gap-3">
                  <div className="font-semibold">Detalhes da negociação</div>
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
                      <dd>{DealById?.paymentMethod}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">
                        Dia de vencimento
                      </dt>
                      <dd>
                        <a href="mailto:">{DealById?.dueDay}</a>
                      </dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">
                        Dia de fechamento
                      </dt>
                      <dd>
                        <a href="tel:">{DealById?.closingDay}</a>
                      </dd>
                    </div>
                  </dl>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3">
                  <dl className="grid gap-3">
                    <div className="flex items-center justify-between">
                      <dt className="flex items-center gap-2 text-muted-foreground">
                        <Button
                          onClick={() =>
                            router.push(`/revenues/${DealById?.id}`)
                          }
                          variant={'link'}
                        >
                          Detalhes da receita <ArrowRight className="w-4 h-4" />{' '}
                        </Button>
                      </dt>
                    </div>
                  </dl>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
