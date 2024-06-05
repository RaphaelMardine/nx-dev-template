import {
  Button,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@v4company/ui-components';
import { UseFormReturn } from 'react-hook-form';
import { Dispatch, SetStateAction, useState } from 'react';
import { IFormCardInputs } from '..';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { interestRates } from '../../../utils';
import { useAuth } from '@v4company/contexts/auth';

interface SummaryProps {
  setStepSelect: Dispatch<SetStateAction<string>>;
  form: UseFormReturn<IFormCardInputs>;
  handleSendDeposit: () => Promise<void>;
}

export const Summary = ({
  setStepSelect,
  form,
  handleSendDeposit,
}: SummaryProps) => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const value = form.watch('value') || '0';

  const getInstallment = (installment: number) => {
    const amount = Number(value?.replace(/\D/g, '')) / 100;
    const installmentAmount = (
      (amount * (1 + interestRates[installment - 1] / 100)) /
      installment
    ).toFixed(2);
    return `${installment}x R$ ${installmentAmount}`;
  };

  return (
    <>
      <DialogHeader className="relative pt-4 pb-4 pl-6 -m-6 shadow-m">
        <DialogTitle className="flex items-center">
          <Button
            variant="link"
            onClick={() => setStepSelect('amountCard')}
            className="pl-0"
          >
            <ChevronLeft size={24} />
          </Button>
          <h4>Depósito</h4>
        </DialogTitle>
      </DialogHeader>
      <div>
        <div className="mt-6 mb-4 -m-6">
          <div className="h-2 bg-black w-[90%] rounded-r-full" />
        </div>
        <div className="flex flex-col max-h-screen gap-6 pb-20 overflow-y-auto">
          <p className="text-xl font-bold">
            Confira os dados para realizar o depósito
          </p>
          <div className="flex flex-col items-center">
            <h3>{form.getValues('value')}</h3>
            <p className="text-base">
              {getInstallment(Number(form.getValues('installments')))}
            </p>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col w-1/2 gap-4 ">
              <p className="font-bold">Unidade</p>
              <span>{user.unit?.name}</span>
            </div>
            <div className="flex flex-col w-1/2 gap-4">
              <p className="font-bold">Tipo de depósito</p>
              <span>
                Cartão com final xx{form.getValues('cardNumber')?.slice(17, 19)}
              </span>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col w-1/2 gap-4 ">
              <p className="font-bold">E-mail</p>
              <span>{form.getValues('email')}</span>
            </div>
            <div className="flex flex-col w-1/2 gap-4">
              <p className="font-bold">CNPJ</p>
              <span>{user.unit?.cnpj}</span>
            </div>
          </div>
          <div className="flex justify-between">
            <p className="text-sm font-normal">
              *os valores depositados em cartão de crédito não estarão
              disponíveis para saque
            </p>
          </div>
        </div>
        <DialogFooter className="absolute bottom-0 left-0 right-0 p-6 mt-6 shadow-m">
          <Button
            type="submit"
            variant="destructive"
            className="flex items-center gap-2 rounded-full"
            disabled={loading}
            onClick={async () => {
              setLoading(true);
              await handleSendDeposit();
              setLoading(false);
            }}
          >
            Seguinte <ChevronRight size={16} />
          </Button>
        </DialogFooter>
      </div>
    </>
  );
};
