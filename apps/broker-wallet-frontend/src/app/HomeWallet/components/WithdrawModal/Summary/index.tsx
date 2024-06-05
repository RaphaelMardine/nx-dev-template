import {
  Button,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@v4company/ui-components';
import { UseFormReturn } from 'react-hook-form';
import { Dispatch, SetStateAction, useState } from 'react';
import { IFormWithdrawInputs } from '..';
import { ArrowUpToLine, ChevronLeft } from 'lucide-react';
import { useAuth } from '@v4company/contexts';

interface SummaryProps {
  setStepSelect: Dispatch<SetStateAction<string>>;
  form: UseFormReturn<IFormWithdrawInputs>;
  handleSendWithdraw: () => Promise<void>;
}

export const Summary = ({
  setStepSelect,
  form,
  handleSendWithdraw,
}: SummaryProps) => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  return (
    <>
      <DialogHeader className="relative pt-4 pb-4 pl-6 -m-6 shadow-m">
        <DialogTitle className="flex items-center">
          <Button
            variant="link"
            onClick={() => setStepSelect('account')}
            className="pl-0"
          >
            <ChevronLeft size={24} />
          </Button>
          <h4>Saque</h4>
        </DialogTitle>
      </DialogHeader>
      <div>
        <div className="mt-6 mb-4 -m-6">
          <div className="h-2 bg-black w-[70%] rounded-r-full" />
        </div>
        <div className="flex flex-col max-h-screen gap-6 pb-20 overflow-y-auto">
          <p className="text-xl font-bold">
            Confira os dados para realizar o saque
          </p>
          <h4>{form.getValues('value')}</h4>
          <div className="flex justify-between">
            <div className="flex flex-col w-1/2 gap-4 ">
              <p className="font-bold">Banco</p>
              <span>{form.getValues('bankCC')}</span>
            </div>
            <div className="flex flex-col w-1/2 gap-4">
              <p className="font-bold">Tipo de conta</p>
              <span>{form.getValues('accontType')}</span>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col w-1/2 gap-4 ">
              <p className="font-bold">Agência</p>
              <span>{form.getValues('bankAg')}</span>
            </div>
            <div className="flex flex-col w-1/2 gap-4">
              <p className="font-bold">Nº da conta</p>
              <span>{form.getValues('bankCC')}</span>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col w-1/2 gap-4 ">
              <p className="font-bold">Nome</p>
              <span>{form.getValues('respName')}</span>
            </div>
            <div className="flex flex-col w-1/2 gap-4">
              <p className="font-bold">Saque da unidade:</p>
              <span>{user.unit?.name}</span>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col w-1/2 gap-4 ">
              <p className="font-bold">Telefone</p>
              <span>{form.getValues('telephone')}</span>
            </div>
            <div className="flex flex-col w-1/2 gap-4">
              <p className="font-bold">E-mail</p>
              <span>{form.getValues('email')}</span>
            </div>
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
              await handleSendWithdraw();
              setLoading(false);
            }}
          >
            Sacar <ArrowUpToLine size={16} />
          </Button>
        </DialogFooter>
      </div>
    </>
  );
};
