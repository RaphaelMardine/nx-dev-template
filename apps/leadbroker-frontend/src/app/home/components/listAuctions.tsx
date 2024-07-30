'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { getAuctions } from '../../../common/services';
import { ERRORS_BY_SOCKET, errorsBySocket, params, TABS } from '../constants';
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
import { queryClient, useAuth } from '@v4company/contexts';
import { useWebsocket } from '@v4company/hooks';
import { Bid, MyLeadResponse } from '../../../common';
import { getTypeAuction } from '../utils';
import { DateGenerate } from './dateGenerate';
import { useCallback, useEffect } from 'react';
import { useToast } from '@v4company/ui-components';
import { ToastProps } from '@radix-ui/react-toast';

export function ListAuctions({ value }: { value: TABS }) {
  const { user } = useAuth();
  const { data } = useWebsocket();
  const router = useRouter();
  const { toast } = useToast();

  const search = useSearchParams();
  const auctionId = search.get('auctionId');
  const packId = search.get('packId');

  const { data: auctions, isLoading } = useQuery({
    queryKey: ['get-auctions', value],
    queryFn: async () => {
      const response = await getAuctions(1, params[value].url);
      return response.data.data;
    },
  });

  const isSelectAuction = (id: string) => {
    if (auctionId === id || packId === id) return true;
    return false;
  };

  const isWinner = (unitId: string) => {
    return unitId === user.unitId;
  };

  const handleBidAuction = async (auctionId: string, type: string) => {
    const isUnitary = type === 'unitary' ? 'auctionId' : 'packId';
    router.push(`/home?${isUnitary}=${auctionId}`);
  };

  const blurExpressPurchase = 'blur-sm';

  const updateAuctions = useCallback(
    async ({ expressPurchase = false }: { expressPurchase?: boolean }) => {
      const body = data.body;
      if (
        (body.bids.filter((bid: Bid) => bid.unitId === user.unitId).length >
          0 ||
          body.winner.unitId === user.unitId) &&
        expressPurchase
      ) {
        const propsNotification =
          body.winner.unitId === user.unitId
            ? {
                title: 'Você arrematou o lead pelo compre já',
                description:
                  'Parabéns, você acabou de ganhar um leilão, Vá até a página meus Leads para mais informações!',
              }
            : {
                title: 'O lead que você estava disputando foi arrematado 💵',
                description:
                  'O lead que você estava disputando foi arrematado, vá até o LeadBroker e confira outras ofertas!',
              };
        toast({
          title: propsNotification.title,
          description: propsNotification.description,
        });
      }

      await queryClient.setQueryData(
        ['get-auctions', value],
        (oldData: MyLeadResponse[]) => {
          return oldData?.map((auction: MyLeadResponse) => {
            if (auction._id === data.body._id) {
              return {
                ...data.body,
                ...{ expressPurchase },
              };
            }
            return auction;
          });
        }
      );
    },
    [data.body, toast, user.unitId, value]
  );

  const addNewAuctions = useCallback(async () => {
    const body = data.body;

    toast({
      title: 'Novo lead adicionado 🚀',
      description: `Um novo lead foi adicionado, vá até o lead para dar seu lance.`,
    });

    await queryClient.setQueryData(
      ['get-auctions', value],
      (oldData: MyLeadResponse[]) => {
        return [body, ...oldData];
      }
    );
  }, [data.body, toast, value]);

  const deleteLead = useCallback(async () => {
    await queryClient.setQueryData(
      ['get-auctions', value],
      (oldData: MyLeadResponse[]) => {
        return oldData?.filter((auction) => auction._id !== data.body._id);
      }
    );
  }, [data.body, value]);

  useEffect(() => {
    if (!data) return;
    if (data.event === 'newExpressPurchase' || data.event === 'newBid') {
      updateAuctions({
        expressPurchase: data.event === 'newExpressPurchase' ? true : false,
      });
    }

    if (data.event === 'newAuction') {
      addNewAuctions();
    }

    if (data.event === 'deleteLead') {
      deleteLead();
    }

    if (data.event === 'error') {
      toast(
        errorsBySocket[data.body.errorCode as ERRORS_BY_SOCKET] as ToastProps
      );
    }
  }, [addNewAuctions, data, deleteLead, toast, updateAuctions]);

  return (
    <>
      <div className="flex flex-wrap gap-4 py-4">
        {auctions
          ?.sort((a, b) => (a.expiresAt < b.expiresAt ? -1 : 1))
          .map((auction) => (
            <Card
              className={`${
                isSelectAuction(auction._id)
                  ? 'border-2 border-red-500 rounded-sm'
                  : ''
              }`}
              expiresAt={auction?.expiresAt}
              key={auction?._id}
              onClick={() =>
                handleBidAuction(
                  auction._id,
                  getTypeAuction(auction?.packSequencial, auction?.refurbished)
                )
              }
            >
              <HeaderCard
                className={`${auction?.expressPurchase && blurExpressPurchase}`}
              >
                <DateGenerate createdAt={auction?.createdAt} />
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
                  <b>Faturamento:</b>{' '}
                  {auction?.revenue || auction?.lead?.revenue}
                </DetailCard>
                <DetailCard>
                  <b>Canal:</b> {auction?.lead?.segment}
                </DetailCard>
              </BodyCard>
              <FooterCard
                value={auction?.winner?.value}
                initialValue={auction?.winner?.initialValue}
                refurbished={auction?.refurbished}
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
