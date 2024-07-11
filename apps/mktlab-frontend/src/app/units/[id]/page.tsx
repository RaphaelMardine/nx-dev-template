'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Tabs,
} from '@v4company/ui-components';
import { ReactNode } from 'react';
import { BreadcrumbUnits } from '../components/breadcrumbUnits';
import { useParams, useSearchParams } from 'next/navigation';
import { RecentDeals } from './components/recentDeals';
import { UseQueryDealByCustomerId } from '../../common/services/requests/deals/getDealsByCustomer';

const Container = ({ children }: { children: ReactNode }) => (
  <div className="w-full p-5 bg-white border border-solid h-max border-color-gray-default">
    {children}
  </div>
);

export default function Units() {
  const { id } = useParams();

  const searchParams = useSearchParams();
  const unitId = Object.fromEntries(searchParams).unitId;

  const { data: DealsByCustomer } = UseQueryDealByCustomerId(id as string, unitId);
  
  const countDeals = DealsByCustomer?.data.result.length || 0;
  return (
    <div className="px-8 pt-20 bg-center first-line:bg-center text-ellipsis">
      <BreadcrumbUnits />
      <div className="pb-6" />
      <div className="flex flex-col gap-8">
        <Container>
          <Tabs defaultValue="active">
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Negociações</CardTitle>
                <CardDescription>
                  Você fez {countDeals}{' '}
                  {countDeals > 1 ? 'negociações' : 'negociação'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentDeals Deals={DealsByCustomer?.data.result || undefined} />
              </CardContent>
            </Card>
          </Tabs>
        </Container>
      </div>
    </div>
  );
}
