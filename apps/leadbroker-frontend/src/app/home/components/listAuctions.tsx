'use client';

import { useQuery } from '@tanstack/react-query';
import { getAuctions } from '../../../common/services';
import { params, TABS } from '../constants';
import {
  BadgeTypeCard,
  BodyCard,
  Card,
  DetailCard,
  ExpressPurchase,
  FooterCard,
  HeaderCard,
  TimerCard,
  TitleCard,
} from './card';
import { WithoutAuctions } from './withoutAuctions';
import { distanceInDays, formatDate } from '@v4company/utils';
import { queryClient, useAuth } from '@v4company/contexts';
import { MyLeadResponse } from '../../../common';

export function ListAuctions({ value }: { value: TABS }) {
  const { user } = useAuth();
  const { data: auctions, isLoading } = useQuery({
    queryKey: ['get-auctions', value],
    queryFn: async () => {
      const response = await getAuctions(1, params[value].url);
      return response.data.data;
    },
  });

  const isWinner = (unitId: string) => {
    return unitId === user.unitId;
  };

  const getTypeAuction = (packSequencial?: number, refurbished?: boolean) => {
    if (refurbished) return 'refurbished';

    if (packSequencial) return 'pack';

    return 'unitary';
  };

  const handleBidAuction = async (auctionId: string) => {
    // here will be changed in the next PR, it was left to simulate the behavior at that time.
    await queryClient.setQueryData(
      ['get-auctions', value],
      (oldData: MyLeadResponse[]) => {
        return oldData?.map((auction: MyLeadResponse) => {
          if (auction._id === auctionId) {
            return {
              ...auction,
              expressPurchase: true,
            };
          }
          return auction;
        });
      }
    );
  };

  const blurExpressPurchase = 'blur-sm';

  return (
    <>
      <div className="flex flex-wrap gap-4 py-4">
        {auctions?.map((auction) => (
          <Card key={auction?._id}>
            <HeaderCard
              className={`${auction?.expressPurchase && blurExpressPurchase}`}
            >
              <div className="px-2 border rounded-full text-neutral-400 border-neutral-400">
                <p className="text-xs font-semibold">
                  Gerado:{' '}
                  {distanceInDays(auction?.createdAt) < 1
                    ? 'Hoje'
                    : formatDate(auction?.createdAt)}
                </p>
              </div>
              <TimerCard futureDate={auction?.expiresAt} />
            </HeaderCard>
            <BodyCard
              className={`${auction?.expressPurchase && blurExpressPurchase}`}
            >
              <BadgeTypeCard
                type={getTypeAuction(
                  auction?.packSequencial,
                  auction?.refurbished
                )}
                size={auction?.leads?.length}
              />
              <TitleCard>
                {auction?.lead?.company ?? `Pack #${auction?.packSequencial}`}
              </TitleCard>
              <DetailCard>
                <b>Segmento:</b> {auction?.lead?.segment}
              </DetailCard>
              <DetailCard>
                <b>Faturamento:</b> {auction?.revenue || auction?.lead?.revenue}
              </DetailCard>
              <DetailCard>
                <b>Canal:</b> {auction?.lead?.segment}
              </DetailCard>
            </BodyCard>
            <FooterCard
              handleBidAuction={() => handleBidAuction(auction._id)}
              value={auction?.winner?.value}
              bids={auction?.bids || []}
              isWinner={isWinner(auction.winner?.unitId)}
              futureDate={auction?.expiresAt}
              className={`${auction?.expressPurchase && blurExpressPurchase}`}
            />
            {auction?.expressPurchase && <ExpressPurchase />}
          </Card>
        ))}
      </div>
      {!isLoading && auctions?.length === 0 && <WithoutAuctions />}
    </>
  );
}
