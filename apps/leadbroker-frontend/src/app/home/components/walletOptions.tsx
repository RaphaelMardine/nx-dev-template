'use client';

import { Button } from '@v4company/ui-components';
import { convertCentsToBRL } from '@v4company/utils';
import { SquareArrowOutUpRight } from 'lucide-react';
import { useBalance } from '../hooks';

export function WalletOptions() {
  const { totalBalance } = useBalance();

  return (
    <div className="flex items-center justify-between px-6 py-4 rounded bg-neutral-600">
      <div className="flex gap-1 text-white">
        <SquareArrowOutUpRight size={24} />
        <div className="flex flex-col">
          <span className="text-sm font-semibold">Seu saldo:</span>
          <span className="text-xl font-semibold">
            {convertCentsToBRL(totalBalance)}
          </span>
        </div>
      </div>
      <Button
        variant="destructive"
        className="rounded-full"
      >
        Depositar
      </Button>
    </div>
  );
}
