import {
  Button,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@v4company/ui-components';
import { convertCentsToBRL, formatDate } from '@v4company/utils';
import { Dispatch, SetStateAction, useState } from 'react';
import { UseFormGetValues } from 'react-hook-form';
import { IFormInputs } from '..';
import { useAuth } from '@v4company/contexts';
import { ChevronLeft } from 'lucide-react';
import { descriptions } from '../../../constants/descriptionsPixOrBankSlip';

interface AmountProps {
  setStepSelect: Dispatch<SetStateAction<string>>;
  getValues: UseFormGetValues<IFormInputs>;
  depositType: 'pix' | 'bank_slip';
  handleSendDeposit: () => Promise<void>;
}

export const Summary = ({
  setStepSelect,
  getValues,
  depositType,
  handleSendDeposit,
}: AmountProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  return (
    <>
      <DialogHeader
        className="relative shadow-m -m-6 pt-4
        pb-4 pl-6"
      >
        <DialogTitle className="flex items-center">
          <Button
            variant="link"
            onClick={() => setStepSelect('amount')}
            className="pl-0"
          >
            <ChevronLeft size={24} />
          </Button>
          <h4>Depósito</h4>
        </DialogTitle>
      </DialogHeader>
      <div>
        <div className="-m-6 mt-6 mb-4">
          <div className="h-2 bg-black w-[75%] rounded-r-full" />
        </div>
        <div className="flex flex-col gap-6 max-h-screen pb-20 overflow-y-auto">
          <p className="text-xl font-bold">
            Confira os dados para realizar o depósito
          </p>
          <h4>
            {convertCentsToBRL(Number(getValues('value')?.replace(/\D/g, '')))}
          </h4>
          <span className="text-xs">{descriptions[depositType]?.tax}</span>
          <div className="flex flex-col gap-4">
            <p className="font-bold">Data de vencimento</p>
            <span>{formatDate(getValues('expires') || new Date())}</span>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-4 w-1/2 ">
              <p className="font-bold">Unidade</p>
              <span>{user.unit?.name}</span>
            </div>
            <div className="flex flex-col gap-4 w-1/2">
              <p className="font-bold">Tipo de depósito</p>
              <span>{descriptions[depositType]?.type}</span>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-4 w-1/2 ">
              <p className="font-bold">CNPJ</p>
              <span>{user.unit?.cnpj}</span>
            </div>
            <div className="flex flex-col gap-4 w-1/2">
              <p className="font-bold">Email</p>
              <span>{getValues('email')}</span>
            </div>
          </div>
        </div>
        <DialogFooter className="absolute bottom-0 right-0 left-0 shadow-m mt-6 p-6">
          <Button
            variant="destructive"
            className="rounded-full flex gap-2"
            disabled={loading}
            onClick={async () => {
              setLoading(true);
              await handleSendDeposit();
              setLoading(false);
            }}
          >
            {descriptions[depositType]?.labelButton}
            {descriptions[depositType]?.icon}
          </Button>
        </DialogFooter>
      </div>
    </>
  );
};
