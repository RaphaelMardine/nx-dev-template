'use client';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Progress,
} from '@v4company/ui-components';
import { convertCentsToBRL, formatDate, formatTime } from '@v4company/utils';
import { BalanceWallet } from '@v4company/types';
import { DollarSign, Dot, Download, ExternalLink } from 'lucide-react';
import { DepositModal } from '../DepositModal';
import { useMemo, useState } from 'react';
import { DepositCardModal } from '../DepositCardModal';
import { WithdrawModal } from '../WithdrawModal';
import { BalanceDrawer } from '../BalanceDrawer';
import { ConfirmExitModal } from '../ConfirmExitModal';

export const WalletHeader = ({ balance }: { balance: BalanceWallet }) => {
  const [depositModalOpen, setDepositModalOpen] = useState(false);
  const [confirmExitModalOpen, setConfirmExitModalOpen] = useState(false);
  const [depositCardModalOpen, setDepositCardModalOpen] = useState(false);
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [balanceDrawerOpen, setBalanceDrawerOpen] = useState(false);
  const [depositType, setDepositType] = useState<'pix' | 'bank_slip'>('pix');

  const totalBalance = useMemo(() => {
    return balance?.available + balance?.bonusAmount;
  }, [balance?.available, balance?.bonusAmount]);

  const percentageAvailable = useMemo(() => {
    return (balance?.available / totalBalance) * 100;
  }, [balance?.available, totalBalance]);

  const dots = Array.from({ length: 9 }, (_, i) => i);

  return (
    <div className="flex flex-col justify-center align-top md:justify-between md:flex-row">
      <div className="flex flex-col max-w-md gap-4">
        <h3>Carteira</h3>
        <p>
          Aqui você poderá realizar depósitos, saques, visualizar suas
          transações e também emitir extratos de sua conta.
        </p>
        <div className="flex flex-col gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={'destructive'}
                className="gap-2 rounded-full max-w-fit"
              >
                Depositar <DollarSign size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => {
                  setDepositModalOpen(true);
                  setDepositType('bank_slip');
                }}
              >
                Boleto
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setDepositModalOpen(true);
                  setDepositType('pix');
                }}
              >
                Pix
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setDepositCardModalOpen(true);
                }}
              >
                Cartão de crédito
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant={'outline'}
            className="gap-2 rounded-full max-w-fit"
            onClick={() => setWithdrawModalOpen(true)}
          >
            Sacar <Download size={16} />
          </Button>
        </div>
      </div>
      <div>
        <div className="p-2 group">
          <div
            onClick={() => setBalanceDrawerOpen(true)}
            className="p-4 rounded cursor-pointer md:pl-10 group-hover:scale-105 group-hover:bg-gray-300"
          >
            <Progress
              value={percentageAvailable}
              max={100}
              className="w-2/5 h-1 rotate-90 translate-x-[-5.2rem] -translate-y-[-4.5rem] bg-green-700 [&>div]:bg-green-500"
            />
            <div className="flex flex-col gap-4">
              <div className="flex justify-between">
                <div className="flex flex-col gap-2">
                  <h6>Saldo total:</h6>
                  <h4>{convertCentsToBRL(totalBalance || 0)}</h4>
                </div>
                <div>
                  <Button
                    className="gap-1"
                    variant="link"
                  >
                    <ExternalLink size={24} />
                    <span className="hidden font-bold group-hover:flex">
                      Ver detalhamento
                    </span>
                  </Button>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between gap-2">
                  <span className="flex align-middle">
                    <Dot
                      width={32}
                      strokeWidth={5}
                      className="text-green-500"
                    />
                    Saldo
                    {dots.map((_, i) => (
                      <Dot
                        key={i}
                        size={16}
                      />
                    ))}
                  </span>
                  <span>{convertCentsToBRL(balance?.available || 0)}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="flex align-bottom">
                    <Dot
                      width={32}
                      strokeWidth={5}
                      className="text-green-700"
                    />
                    Saldo Bônus{' '}
                    {dots.map((_, i) => (
                      <Dot
                        key={i}
                        size={16}
                      />
                    ))}
                  </span>
                  <span>{convertCentsToBRL(balance?.bonusAmount || 0)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <span className="flex justify-end italic">
          Saldo atualizado em {formatDate(new Date())} às{' '}
          {formatTime(new Date())}
        </span>
      </div>
      {depositModalOpen && (
        <DepositModal
          isOpen={depositModalOpen}
          onClose={() => {
            setConfirmExitModalOpen(true);
          }}
          depositType={depositType}
        />
      )}
      {confirmExitModalOpen && (
        <ConfirmExitModal
          isOpen={confirmExitModalOpen}
          onClose={() => setConfirmExitModalOpen(false)}
          onHandleConfirm={() => {
            setDepositModalOpen(false);
            setConfirmExitModalOpen(false);
          }}
          onHandleCancel={() => setConfirmExitModalOpen(false)}
        />
      )}

      {depositCardModalOpen && (
        <DepositCardModal
          isOpen={depositCardModalOpen}
          onClose={() => setDepositCardModalOpen(false)}
        />
      )}
      {withdrawModalOpen && (
        <WithdrawModal
          isOpen={withdrawModalOpen}
          onClose={() => setWithdrawModalOpen(false)}
          balance={balance}
        />
      )}
      {balanceDrawerOpen && (
        <BalanceDrawer
          balance={balance}
          balanceDrawerOpen={balanceDrawerOpen}
          setBalanceDrawerOpen={setBalanceDrawerOpen}
        />
      )}
    </div>
  );
};
