'use client'

import { convertCentsToBRL, formatDate } from '@v4company/utils';
import { HandCoins } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@v4company/ui-components';
import { RevenueShareListResponse } from '../../../common/services/requests/revenues/getRevenuesShareByDealId';

interface IRevenueShareList {
  revenues: RevenueShareListResponse[] | undefined;
}

export function RecentRevenues(data: IRevenueShareList) {

  return (
      <ScrollArea className='h-80'>
    <div className="space-y-8">
      {data && data?.revenues?.map((revenue: RevenueShareListResponse, key: number) => {
        const expectedPayDate = new Date(revenue.expectedPayDate);
        return (
          <div
            className="flex items-center p-2 rounded-sm hover:bg-primary/5"
            key={key}
            >
            <HandCoins className="w-6 h-6" />
            <div className="flex justify-between w-full">
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  #{revenue.id.slice(0, 7)}...
                </p>
                <p className="text-sm text-muted-foreground">
                  {formatDate(expectedPayDate)}
                </p>
              </div>
              <div className="flex flex-col">
                <div className="ml-auto font-medium">+{convertCentsToBRL(revenue.centsAmount)}</div>
                <small>{revenue.legalName.slice(0, 15)} - {revenue.percentAmount}% </small>
              </div>
            </div>
          </div>
        );
      })}
    </div>
      <ScrollBar />
      </ScrollArea>
  );
}
