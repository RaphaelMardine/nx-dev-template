import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@v4company/ui-components';
import { Bid, MyLeadResponse, Winner, Location } from '../../../common';

import { DateGenerate } from './dateGenerate';
import { useTicker } from '../hooks';
import { useMemo } from 'react';
import { Timer } from 'lucide-react';
import { convertCentsToBRL, formatTime } from '@v4company/utils';
import { BadgeTypeCard } from './card';

export function AuctionCardLead({
  auction,
  bids,
  winner,
  location,
  packSequencial,
  type,
  size,
}: {
  auction: MyLeadResponse;
  bids: Bid[];
  winner: Winner;
  location?: Location;
  packSequencial?: number;
  type: 'pack' | 'unitary' | 'refurbished';
  size?: number;
}) {
  const { hours, isTimeUp, minutes, seconds } = useTicker(auction?.expiresAt);

  const displayTimeValue = useMemo(() => {
    const timeValue = isTimeUp
      ? 'Finalizado'
      : `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
          2,
          '0'
        )}:${String(seconds).padStart(2, '0')}`;

    return timeValue;
  }, [hours, isTimeUp, minutes, seconds]);

  const whoSeen = [
    { userName: 'Fulano da silva', _id: '1', picture: '' },
    { userName: 'Fulano da silva', _id: '2', picture: '' },
    { userName: 'Fulano da silva', _id: '3', picture: '' },
    { userName: 'Fulano da silva', _id: '4', picture: '' },
  ];

  const getInitials = (name: string) => {
    const [firstName, lastName] = name.split(' ');
    return `${firstName[0]}${lastName[0]}`;
  };
  return (
    <div className="flex flex-col px-6 py-4 mx-6 my-2 bg-white border rounded-lg border-neutral-300 gap-7">
      <div className="flex justify-between gap-5">
        <div className="flex flex-col w-1/2 gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <DateGenerate createdAt={auction?.createdAt} />
              <div className="flex items-center gap-1 px-4 py-1 text-red-600 rounded-lg bg-neutral-100 w-fit">
                <Timer size={14} />
                <span className="text-lg font-semibold">
                  {displayTimeValue}
                </span>
              </div>
            </div>
            <div className="px-4 py-1 border border-neutral-100 w-fit">
              <p className="text-xs">Valor:</p>
              <p className="text-lg font-semibold">
                {convertCentsToBRL(winner?.value)}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xs font-semibold">Últimas vivitas:</p>
              <div className="flex gap-2">
                {whoSeen.map((viewer, index) => {
                  if (index < 3)
                    return (
                      <Avatar
                        className={`${index > 0 && '-ml-3'} w-8 h-8`}
                        key={viewer._id}
                      >
                        <AvatarImage src={viewer.picture} />
                        <AvatarFallback className="uppercase">
                          {getInitials(viewer.userName)}
                        </AvatarFallback>
                      </Avatar>
                    );
                })}
                {whoSeen.length > 3 && (
                  <p className="text-xs font-semibold text-purple-400">
                    + {whoSeen.length - 3} views
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-1/2 gap-4">
          <div className="flex flex-col gap-2">
            <BadgeTypeCard
              type={type}
              size={size}
            />
            <div className="flex flex-col">
              <p
                className={`text-xs font-semibold ${
                  !packSequencial && 'opacity-0'
                }`}
              >
                Pack #{packSequencial}
              </p>
              <p className="text-xl font-semibold">{auction?.lead?.company}</p>
            </div>
          </div>
          <div className="flex flex-col gap-1 max-w-44">
            <p className="text-xs">
              <b className="font-semibold">Segmento: </b>
              {auction?.lead?.segment}
            </p>
            <p className="overflow-hidden text-xs font-bold truncate whitespace-nowrap">
              <b className="font-semibold">Faturamento: </b>
              {auction?.lead?.revenue}
            </p>
            <p className="text-xs">
              <b className="font-semibold">Canal: </b>
              {auction?.lead?.channel}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold">
              {bids?.length} lances até o momento
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between gap-14">
          <p className="w-1/2 text-sm text-right text-neutral-500">
            Nome contato:
          </p>
          <p className="w-1/2 text-sm text-neutral-800">
            {auction?.lead?.name || '-'}
          </p>
        </div>
        <div className="flex justify-between gap-14">
          <p className="w-1/2 text-sm text-right text-neutral-500">Cargo:</p>
          <p className="w-1/2 text-sm text-neutral-800">
            {auction?.lead?.companyPosition || '-'}
          </p>
        </div>
        <div className="flex justify-between gap-14">
          <p className="w-1/2 text-sm text-right text-neutral-500">
            Localização:
          </p>
          <p className="w-1/2 text-sm text-neutral-800">
            {location
              ? (location?.city || '') + ' - ' + (location?.state || '')
              : '-'}
          </p>
        </div>
        <div className="flex justify-between gap-14">
          <p className="w-1/2 text-sm text-right text-neutral-500">Telefone:</p>
          <p className="w-1/2 text-sm text-neutral-800">
            {auction?.lead?.tel || '-'}
          </p>
        </div>
        <div className="flex justify-between gap-14">
          <p className="w-1/2 text-sm text-right text-neutral-500">CNPJ:</p>
          <p className="w-1/2 text-sm text-neutral-800">
            {auction?.lead?.cnpj || '-'}
          </p>
        </div>
        <div className="flex justify-between gap-14">
          <p className="w-1/2 text-sm text-right text-neutral-500">E-mail:</p>
          <p className="w-1/2 text-sm text-neutral-800">
            {auction?.lead?.email || '-'}
          </p>
        </div>
        <div className="flex justify-between gap-14">
          <p className="w-1/2 text-sm text-right text-neutral-500">
            Nível de urgência:
          </p>
          <p className="w-1/2 text-sm text-neutral-800">
            {auction?.lead?.urgencyToStart || '-'}
          </p>
        </div>
        {auction?.lead?.description && (
          <div className="flex justify-between gap-14">
            <p className="w-1/2 text-sm text-right text-neutral-500">
              Descrição:
            </p>
            <HoverCard>
              <HoverCardTrigger className="w-1/2">
                <p className="text-sm text-purple-400">Ver mais</p>
              </HoverCardTrigger>
              <HoverCardContent>{auction?.lead?.description}</HoverCardContent>
            </HoverCard>
          </div>
        )}
      </div>
      {bids?.length > 0 && (
        <div className="flex flex-col gap-1 px-10">
          <div className="flex justify-between gap-14">
            <p className="w-1/2 text-sm font-medium text-muted-foreground">
              Últimos lances
            </p>
            <p className="w-1/2 text-sm font-medium text-right text-muted-foreground">
              Valor
            </p>
          </div>
          {bids
            ?.sort((a, b) => (a.time < b.time ? 1 : -1))
            ?.map((bid, index) => {
              return (
                index < 3 && (
                  <div key={index}>
                    <hr />
                    <div className="flex justify-between gap-14">
                      <p
                        className={`w-1/2 text-sm ${
                          index === 0
                            ? 'text-green-600 font-semibold'
                            : 'text-neutral-400'
                        }`}
                      >
                        {formatTime(bid?.time)}
                      </p>
                      <p
                        className={`w-1/2 text-sm text-right ${
                          index === 0
                            ? 'text-green-600 font-semibold'
                            : 'text-neutral-400'
                        }`}
                      >
                        {convertCentsToBRL(bid.value)}
                      </p>
                    </div>
                  </div>
                )
              );
            })}
          <hr />
        </div>
      )}
    </div>
  );
}
