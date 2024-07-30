import { ReactNode, useMemo } from 'react';
import { useTicker } from '../hooks';
import { Timer } from 'lucide-react';
import { convertCentsToBRL } from '@v4company/utils';
import { buttonType } from '../constants';
import { Bid } from '../../../common';
import { useAuth } from '@v4company/contexts';
import Image from 'next/image';
import ExpressPurchaseImage from '../assets/express_puchase.png';
import { addSeconds } from 'date-fns';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  onClick?: () => void;
  expiresAt: Date;
}
interface FooterCardProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  initialValue?: number;
  refurbished?: boolean;
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
    <div className={`flex items-center justify-between ${className} mb-4`}>
      {children}
    </div>
  );
}

function BodyCard({ children, className }: BodyCardProps) {
  return (
    <div className={`flex flex-col gap-1 ${className} mb-1`}>{children}</div>
  );
}

function TitleCard({ children }: { children: ReactNode }) {
  return (
    <h6 className="overflow-hidden text-xl font-semibold uppercase truncate text-neutral-900 whitespace-nowrap">
      {children}
    </h6>
  );
}

function DetailCard({ children }: { children: ReactNode }) {
  return <p className="text-xs text-neutral-600">{children}</p>;
}

function TimerCard({ futureDate }: { futureDate: Date }) {
  const { hours, minutes, seconds } = useTicker(futureDate);

  const displayTimeValue = useMemo(() => {
    const timeValue = `${String(hours).padStart(2, '0')}:${String(
      minutes
    ).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    return timeValue;
  }, [hours, minutes, seconds]);

  const isFinishing = hours === 0 && minutes === 0 && seconds < 10;

  return (
    <div className="flex items-center gap-1">
      <Timer
        className="text-neutral-400"
        size={16}
      />
      <span
        className={`font-bold ${
          isFinishing ? 'text-red-600' : 'text-neutral-900'
        }`}
      >
        {displayTimeValue}
      </span>
    </div>
  );
}

function FooterCard({
  value,
  initialValue,
  refurbished,
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
      <div className={!refurbished ? 'opacity-0' : ''}>
        <p className="text-xs font-medium text-left">
          Valor:{' '}
          <span className="text-xs line-through">
            {convertCentsToBRL(initialValue || 0)}
          </span>
        </p>
      </div>
      <div className="py-1 border rounded-full">
        <p className="text-lg font-bold">{convertCentsToBRL(value)}</p>
      </div>
      <div
        className={`w-full text-xs font-semibold rounded-full border py-1 ${
          buttonType[getTypeButton()].className
        }`}
      >
        {buttonType[getTypeButton()].label}
      </div>
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

function Card({ children, onClick, expiresAt, className }: CardProps) {
  const { isTimeUp } = useTicker(addSeconds(expiresAt, 10));

  return (
    <div
      className={`hover:scale-105 cursor-pointer relative flex flex-col w-64 gap-2 p-4 bg-white border rounded-lg shadow-lg ${className} ${
        isTimeUp ? 'hidden' : ''
      }`}
      onClick={onClick}
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
