import {
  Button,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@v4company/ui-components';
import { UseFormReturn } from 'react-hook-form';
import { IFormCardInputs } from '..';
import { interestRates } from '../../../utils';
import { useAuth } from '@v4company/contexts';
import { PaymentDetails } from '../../../../../common/types';
import { CircleCheckBig } from 'lucide-react';

interface ResumeProps {
  form: UseFormReturn<IFormCardInputs>;
  onClose: () => void;
  paymentDetails: PaymentDetails;
}

export const Resume = ({ form, onClose, paymentDetails }: ResumeProps) => {
  const { user } = useAuth();

  const getInstallment = (installment: number) => {
    const amount = paymentDetails.value / 100;
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
          <h4>Depósito</h4>
        </DialogTitle>
      </DialogHeader>
      <div>
        <div className="mt-6 mb-4 -m-6">
          <div className="w-full h-2 bg-black" />
        </div>
        <div className="flex flex-col max-h-screen gap-6 pb-20 overflow-y-auto">
          <div className="flex flex-col items-center">
            <CircleCheckBig
              size={64}
              className="text-green-500"
            />
            <p className="text-xl font-bold">
              Pagamento confirmado com sucesso
            </p>
          </div>
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
        </div>
        <DialogFooter className="absolute bottom-0 left-0 right-0 p-6 mt-6 shadow-m">
          <Button
            type="submit"
            variant="destructive"
            className="flex items-center gap-2 rounded-full"
            onClick={() => {
              onClose();
            }}
          >
            Ir à carteira
          </Button>
        </DialogFooter>
      </div>
    </>
  );
};
