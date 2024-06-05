import {
  Button,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@v4company/ui-components';
import Image from 'next/image';
import Robiati from '../../../assets/robiati.png';

interface ErrorWithdrawProps {
  handleSendWithdraw: () => Promise<void>;
}

export const ErrorWithdraw = ({ handleSendWithdraw }: ErrorWithdrawProps) => {
  return (
    <>
      <DialogHeader className="relative pt-4 pb-4 pl-6 -m-6 shadow-m">
        <DialogTitle className="flex items-center">
          <h4>Depósito com cartão de crédito</h4>
        </DialogTitle>
      </DialogHeader>
      <div>
        <div className="flex flex-col items-center max-h-screen gap-6 pt-12 pb-20 overflow-y-auto">
          <Image
            width={200}
            src={Robiati}
            alt="robiati error"
          />
          <h5 className="text-red-800">Erro ao realizar a solicitação</h5>
          <p className="text-base font-normal">
            Tivemos um imprevisto na sua solicitação de saque. Tente novamente!
          </p>
          <Button
            onClick={handleSendWithdraw}
            className="rounded-full"
            variant="destructive"
          >
            Solicitar novamente
          </Button>
        </div>
        <DialogFooter className="absolute bottom-0 left-0 right-0 p-6 mt-6 shadow-m">
          <br />
        </DialogFooter>
      </div>
    </>
  );
};
