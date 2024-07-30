'use client';

import { useSearchParams } from 'next/navigation';
import { AuctionCards, NotSelected } from '.';
import { useQuery } from '@tanstack/react-query';
import { getAuction } from '../../../common/services';
import { useCallback, useEffect } from 'react';
import { useWebsocket } from '@v4company/hooks';
import { queryClient } from '@v4company/contexts';

export function Bids() {
  const search = useSearchParams();
  const auctionId = search.get('auctionId');
  const packId = search.get('packId');
  const { data } = useWebsocket();

  const { data: auction, isLoading } = useQuery({
    queryKey: ['get-auction', auctionId, packId],
    queryFn: async () => {
      const response = await getAuction({
        auctionId: auctionId as string,
        packId: packId as string,
      });
      return response.data;
    },
    enabled: !!auctionId || !!packId,
  });

  const updateAuction = useCallback(async () => {
    await queryClient.setQueryData(['get-auction', auctionId, packId], () => {
      return data.body;
    });
  }, [auctionId, data.body, packId]);

  useEffect(() => {
    if (!data) return;
    if (data.event === 'newBid' || data.event === 'newExpressPurchase') {
      if (data.body._id !== auctionId && data.body._id !== packId) return;
      updateAuction();
    }
  }, [auctionId, data, packId, updateAuction]);

  return (auctionId || packId) && auction?._id && !isLoading ? (
    <AuctionCards auction={auction} />
  ) : (
    <NotSelected loading={isLoading} />
  );
}
