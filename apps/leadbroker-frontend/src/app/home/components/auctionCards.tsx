'use client';

import {
  Button,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Form,
  MoneyInput,
  useToast,
} from '@v4company/ui-components';
import { MyLeadResponse } from '../../../common';
import { getTypeAuction } from '../utils';
import { AuctionCardLead } from './auctionCardLead';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useCallback, useEffect, useState } from 'react';
import { convertCentsToBRL } from '@v4company/utils';
import { bidAuction } from '../../../common/services/requests/bidAuction';
import { useBalance, useTicker } from '../hooks';
import { bidIncrements } from '../constants';

interface IFormBid {
  value: string;
  buyNow?: boolean;
}

export function AuctionCards({ auction }: { auction?: MyLeadResponse }) {
  const { toast } = useToast();
  const [increment, setIncrement] = useState(1000);
  const { totalBalance } = useBalance();
  const { isTimeUp } = useTicker(auction?.expiresAt);
  const disabledBid = isTimeUp;
  const packType = getTypeAuction(
    auction?.packSequencial,
    auction?.refurbished
  );

  const schema = z.object({
    value: z.string({
      required_error: 'Você precisa selecionar o motivo da perda',
    }),
    buyNow: z.boolean(),
  });

  const form = useForm<IFormBid>({
    resolver: zodResolver(schema),
    defaultValues: {
      value: convertCentsToBRL((auction?.winner?.value || 0) + increment),
      buyNow: false,
    },
  });

  const onSubmit: SubmitHandler<IFormBid> = useCallback(
    async (data) => {
      const lastvalue = auction?.winner?.value || 0;
      const value = Number(data.value.replace(/[^0-9]/g, ''));
      if (value < lastvalue + increment && !data.buyNow) {
        form.setError('value', {
          type: 'manual',
          message: 'O valor do lance deve ser maior que o valor atual',
        });
        return;
      }
      if (value > totalBalance) {
        form.setError('value', {
          type: 'manual',
          message: 'Você não tem saldo suficiente para realizar o lance',
        });
        return;
      }

      const response = await bidAuction({
        _id: auction?._id || '',
        auction: packType === 'pack' ? 'pack' : 'lead',
        value: data.buyNow ? lastvalue : value,
        buyNow: data.buyNow,
      });
      if (response.error) {
        toast({
          title: 'Erro!',
          description: 'Não foi possível realizar o lance.',
          variant: 'destructive',
        });
      }
    },
    [
      auction?._id,
      auction?.winner?.value,
      form,
      increment,
      packType,
      toast,
      totalBalance,
    ]
  );

  const handleUpdateIncrement = (increment: number) => {
    form.setValue(
      'value',
      convertCentsToBRL((auction?.winner?.value || 0) + increment)
    );
    setIncrement(increment);
  };

  useEffect(() => {
    if (
      form.getValues('value') ===
      convertCentsToBRL((auction?.winner?.value || 0) + increment)
    )
      return;
    form.setValue(
      'value',
      convertCentsToBRL((auction?.winner?.value || 0) + increment)
    );
  }, [auction?.winner?.value, increment, form]);

  return (
    <div className="px-4 pb-2">
      <Carousel>
        <CarouselContent>
          {packType === 'pack' ? (
            auction?.leads?.map((lead) => (
              <CarouselItem key={lead._id}>
                <AuctionCardLead
                  auction={lead}
                  bids={auction?.bids || []}
                  winner={auction?.winner}
                  location={lead?.location}
                  type={packType}
                  size={auction?.leads?.length}
                />
              </CarouselItem>
            ))
          ) : (
            <CarouselItem>
              {auction?.lead && (
                <AuctionCardLead
                  auction={auction}
                  bids={auction?.bids || []}
                  winner={auction?.winner}
                  location={auction?.location}
                  type={packType}
                  size={auction?.leads?.length}
                />
              )}
            </CarouselItem>
          )}
        </CarouselContent>
        {packType === 'pack' && (
          <>
            <CarouselPrevious className="-left-4" />
            <CarouselNext className="-right-4" />
          </>
        )}
      </Carousel>
      <div className="flex flex-col pt-2">
        <p className="text-xl font-semibold text-red-600">
          Faça sua oferta agora!
        </p>
        <Form {...form}>
          <form
            className="flex flex-col gap-2"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex items-end gap-2">
              <div className="w-full">
                <MoneyInput
                  form={form}
                  name="value"
                  label="Digite o valor do seu lance:"
                  disabled={disabledBid}
                  placeholder="R$ 0,00"
                  decimal={2}
                />
              </div>
              <Button
                className="rounded-full"
                autoFocus
                type="submit"
                disabled={disabledBid}
              >
                Dar lance
              </Button>
              <Button
                className="rounded-full"
                variant="destructive"
                disabled={disabledBid}
                onClick={() => form.setValue('buyNow', true)}
              >
                Comprar já
              </Button>
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col w-1/2 gap-2">
                <p className="text-xs font-medium">Ou use as opções:</p>
                <div className="flex gap-2">
                  {bidIncrements.map((bidIncrement) => (
                    <Button
                      key={bidIncrement.label}
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={disabledBid}
                      className={`px-3 text-sm font-semibold border-red-500 rounded-full w-fit ${
                        bidIncrement.increment === increment
                          ? 'bg-red-500 hover:bg-red-500 text-white hover:text-white'
                          : 'text-red-500 hover:text-red-400'
                      }`}
                      onClick={() =>
                        handleUpdateIncrement(bidIncrement.increment)
                      }
                    >
                      {bidIncrement.label}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="w-1/2 pl-6">
                <p className="text-xs text-neutral-500">
                  Na opção <b>Compre já</b>, você irá arrematar diretamente, sem
                  ter que esperar o tempo acabar!
                </p>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
