import {
  Button,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  MoneyInput,
} from '@v4company/ui-components';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import { IFormWithdrawInputs } from '..';
import { useAuth } from '@v4company/contexts';
import { ChevronRight } from 'lucide-react';
import { convertCentsToBRL } from '@v4company/utils';
import { BalanceWallet } from '@v4company/types';

interface AmountProps {
  onSubmit: SubmitHandler<IFormWithdrawInputs>;
  form: UseFormReturn<IFormWithdrawInputs>;
  balance: BalanceWallet;
}

export const Amount = ({ onSubmit, form, balance }: AmountProps) => {
  const totalBalance = balance?.available + balance?.bonusAmount;
  const { user } = useAuth();

  return (
    <>
      <DialogHeader className="relative pt-4 pb-4 pl-6 -m-6 shadow-m">
        <DialogTitle className="flex items-center">
          <h4>Saque</h4>
        </DialogTitle>
      </DialogHeader>
      <div>
        <div className="mt-6 mb-4 -m-6">
          <div className="h-2 bg-black w-[0%] rounded-r-full" />
        </div>
        <div className="flex flex-col max-h-screen gap-6 pb-20 overflow-y-auto">
          <p className="text-xl font-bold">Realizando saque como</p>
          <div className="flex w-full">
            <div className="w-full">
              <p className="text-sm font-bold ">Unidade</p>
              <p>{user.unit?.name}</p>
            </div>
            <div className="w-full">
              <p className="text-sm font-bold ">CNPJ</p>
              <p>{user.unit?.cnpj}</p>
            </div>
          </div>
          <p className="text-xl font-bold">Defina o valor de saque</p>
          <div className="w-1/2">
            <MoneyInput
              form={form}
              name="value"
              label="Qual o valor de saque?"
              placeholder="R$ 100,00"
              decimal={2}
            />
          </div>
          <div className="flex justify-between">
            <p className="text-base font-bold">Saldo total</p>
            <p className="text-xl font-bold">
              {convertCentsToBRL(totalBalance)}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-sans text-base">Saque</p>
              <p className="font-sans text-base">Valor depositado para saque</p>
            </div>
            <p className="text-base font-bold">
              {convertCentsToBRL(balance?.available)}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-sans text-base">Crédito bônus</p>
              <p className="font-sans text-base">
                Crédito com data de expiração <br />e sem possibilidade de saque
              </p>
            </div>
            <p className="text-base font-bold">
              {convertCentsToBRL(balance?.bonusAmount)}
            </p>
          </div>
        </div>
        <DialogFooter className="absolute bottom-0 left-0 right-0 p-6 mt-6 shadow-m">
          <Button
            type="submit"
            variant="destructive"
            className="flex items-center gap-2 rounded-full"
            onClick={() => {
              form.handleSubmit(onSubmit);
            }}
          >
            Seguinte <ChevronRight size={16} />
          </Button>
        </DialogFooter>
      </div>
    </>
  );
};
