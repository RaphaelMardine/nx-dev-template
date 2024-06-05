import {
  Button,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@v4company/ui-components';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import { IFormWithdrawInputs } from '..';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';
import { WalletInfo, getWalletInfo } from '../../../../../common';
import { useQuery } from '@tanstack/react-query';
import { AccountFields } from '../..';

interface AmountProps {
  onSubmit: SubmitHandler<IFormWithdrawInputs>;
  form: UseFormReturn<IFormWithdrawInputs>;
  setStepSelect: Dispatch<SetStateAction<string>>;
}

export const Account = ({ onSubmit, form, setStepSelect }: AmountProps) => {
  const [disabled, setDisabled] = useState(false);

  const setValues = (data: WalletInfo) => {
    form.setValue('telephone', data?.phone);
    form.setValue('bank', data?.bank);
    form.setValue('accontType', data?.accountType);
    form.setValue('bankAg', data?.agency);
    form.setValue('bankCC', data?.account);
    form.setValue('respName', data?.unitName);
    form.setValue('respCpf', data?.cnpj);
  };

  useQuery({
    queryKey: ['get-wallet-info'],
    queryFn: async () => {
      const { data, error } = await getWalletInfo();
      if (error) return;

      setDisabled(true);
      setValues(data);
      return data;
    },
  });

  return (
    <>
      <DialogHeader className="relative pt-4 pb-4 pl-6 -m-6 shadow-m">
        <DialogTitle className="flex items-center">
          <Button
            variant="link"
            onClick={() => setStepSelect('amount')}
            className="pl-0"
          >
            <ChevronLeft size={24} />
          </Button>
          <h4>Saque</h4>
        </DialogTitle>
      </DialogHeader>
      <div>
        <div className="mt-6 mb-4 -m-6">
          <div className="h-2 bg-black w-[30%] rounded-r-full" />
        </div>
        <AccountFields
          disabled={disabled}
          form={form}
        />
        <DialogFooter className="absolute bottom-0 left-0 right-0 p-6 mt-6 shadow-m">
          <Button
            type="submit"
            variant="destructive"
            className="flex items-center gap-2 rounded-full"
            onClick={() => {
              form.handleSubmit(onSubmit);
            }}
          >
            Seguir para resumo <ChevronRight size={16} />
          </Button>
        </DialogFooter>
      </div>
    </>
  );
};
