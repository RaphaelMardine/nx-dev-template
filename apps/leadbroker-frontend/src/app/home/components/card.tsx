import { ReactNode, useMemo } from 'react';
import { useTicker } from '../hooks';
import { Timer } from 'lucide-react';
import { Button } from '@v4company/ui-components';
import { convertCentsToBRL } from '@v4company/utils';
import { buttonType } from '../constants';
import { Bid } from '../../../common';
import { useAuth } from '@v4company/contexts';
import Image from 'next/image';
import ExpressPurchaseImage from '../assets/express_puchase.png';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}
interface FooterCardProps extends React.HTMLAttributes<HTMLDivElement> {
  handleBidAuction: () => void;
  value: number;
  bids: Bid[];
  isWinner: boolean;
  futureDate: Date;
}

interface HeaderCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

interface BodyCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

function BadgeTypeCard({
  type,
  size,
}: {
  type: 'pack' | 'unitary' | 'refurbished';
  size?: number;
}) {
  const badgeType = {
    pack: {
      label: `Pack c/ ${size} leads`,
      className: 'bg-destructive  text-white',
    },
    unitary: {
      label: 'Unitário',
      className: 'bg-white text-black',
    },
    refurbished: {
      label: 'Promoção',
      className: 'bg-neutral-600 text-white',
    },
  };
  return (
    <div
      className={`w-fit rounded-full px-2 flex border border-neutral-200 ${badgeType[type].className}`}
    >
      <span className="text-xs">{badgeType[type].label}</span>
    </div>
  );
}

function HeaderCard({ children, className }: HeaderCardProps) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      {children}
    </div>
  );
}

function BodyCard({ children, className }: BodyCardProps) {
  return <div className={`flex flex-col gap-1 ${className}`}>{children}</div>;
}

function TitleCard({ children }: { children: ReactNode }) {
  return (
    <h6 className="text-xl font-semibold uppercase text-neutral-900">
      {children}
    </h6>
  );
}

function DetailCard({ children }: { children: ReactNode }) {
  return <p className="text-xs text-neutral-600">{children}</p>;
}

function TimerCard({ futureDate }: { futureDate: Date }) {
  const { hours, isTimeUp, minutes, seconds } = useTicker(futureDate);

  const displayTimeValue = useMemo(() => {
    const timeValue = isTimeUp
      ? 'Finalizado'
      : `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
          2,
          '0'
        )}:${String(seconds).padStart(2, '0')}`;

    return timeValue;
  }, [hours, isTimeUp, minutes, seconds]);

  return (
    <div className="flex items-center gap-1">
      <Timer
        className="text-neutral-400"
        size={16}
      />
      <span className="font-bold text-neutral-900">{displayTimeValue}</span>
    </div>
  );
}

function FooterCard({
  handleBidAuction,
  value,
  bids,
  isWinner,
  futureDate,
  className,
}: FooterCardProps) {
  const { user } = useAuth();
  const { isTimeUp } = useTicker(futureDate);

  const getTypeButton = () => {
    if (isTimeUp) return 'finished';

    if (isWinner) return 'winner';

    if (bids.filter((bid) => bid.unitId === user.unitId).length > 0)
      return 'overcomed';

    return 'noBid';
  };

  return (
    <div
      className={`flex flex-col justify-end gap-2 px-4 text-center ${className}`}
    >
      <div className="py-1 border rounded-full">
        <p className="text-lg font-bold">{convertCentsToBRL(value)}</p>
      </div>
      <Button
        variant="outline"
        className={`w-full rounded-full ${
          buttonType[getTypeButton()].className
        }`}
        onClick={handleBidAuction}
      >
        {buttonType[getTypeButton()].label}
      </Button>
      <div>
        <p className="text-xs font-semibold text-neutral-800">
          {bids?.length} lances até o momento
        </p>
      </div>
    </div>
  );
}

function ExpressPurchase() {
  return (
    <div className="absolute top-0 left-0 block w-full h-full blur-none">
      <div className="z-10 h-full px-8 py-12">
        <div className="flex flex-col items-center justify-center w-full h-full bg-yellow-600 rounded-lg">
          <Image
            src={ExpressPurchaseImage}
            alt="Compra Expressa"
          />
          <span className="p-4 text-sm font-semibold text-center">
            Arrematado pelo compre já.
          </span>
        </div>
      </div>
    </div>
  );
}

function Card({ children, className }: CardProps) {
  return (
    <div
      className={`relative flex flex-col w-64 gap-6 p-4 bg-white border rounded-lg shadow-lg ${className}`}
    >
      {children}
    </div>
  );
}

export {
  Card,
  HeaderCard,
  BodyCard,
  TitleCard,
  DetailCard,
  TimerCard,
  FooterCard,
  BadgeTypeCard,
  ExpressPurchase,
};
