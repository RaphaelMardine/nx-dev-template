import {
  Button,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  useToast,
} from '@v4company/ui-components';
import { convertCentsToBRL } from '@v4company/utils';
import { descriptions } from '../../../constants/descriptionsPixOrBankSlip';
import Image from 'next/image';
import { Copy } from 'lucide-react';
import { formatBarcode, useTicker } from '../../../../../common';
import { useMemo } from 'react';
import { addMinutes } from 'date-fns';
import { PaymentDetails } from '../../../../../common/types';

interface AmountProps {
  depositType: 'pix' | 'bank_slip';
  onClose: () => void;
  paymentDetails: PaymentDetails;
}

const DURATION_PIX = 30;

export const Resume = ({
  depositType,
  onClose,
  paymentDetails,
}: AmountProps) => {
  const { isTimeUp, minutes, seconds } = useTicker(
    addMinutes(paymentDetails.createdAt, DURATION_PIX)
  );

  const displayTimeValue = useMemo(() => {
    const timeValue = isTimeUp
      ? 'Expirado'
      : `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
          2,
          '0'
        )}`;

    return timeValue;
  }, [isTimeUp, minutes, seconds]);

  const { toast } = useToast();

  return (
    <>
      <DialogHeader className="relative pt-4 pb-4 pl-6 -m-6 shadow-m">
        <DialogTitle className="flex items-center">
          <h4>{descriptions[depositType].title}</h4>
        </DialogTitle>
      </DialogHeader>
      <div className="mt-10">
        <div className="flex flex-col items-center max-h-screen gap-6 pb-20 overflow-y-auto">
          <p className="text-xl font-bold">
            Pedido aceito, aguardando pagamento
          </p>
          <h3>{convertCentsToBRL(paymentDetails.value)}</h3>
          {paymentDetails.bankSlip && (
            <div className="flex flex-col gap-4 text-center">
              <div className="flex flex-col gap-2">
                <Image
                  width={600}
                  height={400}
                  src={paymentDetails.bankSlip?.barcode}
                  alt="barCode"
                />
                <div className="flex items-center justify-end">
                  <p className="w-10/12 text-xl font-bold text-center">
                    {formatBarcode(paymentDetails.bankSlip?.digitableLine)}
                  </p>
                  <Button
                    className="flex justify-start"
                    variant="link"
                    onClick={(e) => {
                      e.preventDefault();
                      navigator.clipboard.writeText(
                        paymentDetails.bankSlip?.digitableLine || ''
                      );
                      toast({
                        title: 'Sucesso!',
                        description:
                          'Dados copiados para a área de transferência',
                        variant: 'default',
                      });
                    }}
                  >
                    <Copy size={16} />
                  </Button>
                </div>
              </div>
              <p className="text-base">
                Copie e cole o número do ticket no seu banco on-line
              </p>
              <p className="text-base">
                Esse é um boleto registrado. Por favor verifique se as
                informações estão corretas. Nunca pague por boleto que não tenha
                sido solicitado por você.
              </p>
              <p className="text-base">
                A compensação do boleto pode levar o prazo máximo de até 3 dias
                úteis.
              </p>
            </div>
          )}
          {paymentDetails.pix && (
            <>
              <div className="flex flex-col gap-4 text-center">
                <p className="text-base">
                  Digitalize o código PIX QR com seu celular
                </p>
                <div className="flex flex-col items-center gap-2">
                  <Image
                    width={200}
                    height={200}
                    src={paymentDetails.pix?.qrcode}
                    alt="barCode"
                  />
                  <p className="text-xs">
                    Seu código expira em {displayTimeValue}
                  </p>
                  <p className="text-xs">faça o pagamento dentro do prazo</p>
                </div>
                <p className="text-xs font-normal">
                  Você está tendo problemas para ler o código QR? Copie o código
                  abaixo e insira-o manualmente
                </p>
                <div className="flex items-center justify-end">
                  <p className="text-base italic text-center underline break-all font-extralight">
                    {formatBarcode(paymentDetails.pix?.qrcodeText)}
                  </p>
                  <Button
                    className="flex justify-start"
                    variant="link"
                    onClick={(e) => {
                      e.preventDefault();
                      navigator.clipboard.writeText(
                        paymentDetails.bankSlip?.digitableLine || ''
                      );
                      toast({
                        title: 'Sucesso!',
                        description:
                          'Dados copiados para a área de transferência',
                        variant: 'default',
                      });
                    }}
                  >
                    <Copy size={16} />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
        <DialogFooter className="absolute bottom-0 left-0 right-0 p-6 mt-6 shadow-m">
          <Button
            variant="destructive"
            className="flex gap-2 rounded-full"
            onClick={async () => {
              onClose();
            }}
          >
            Retornar à carteira
          </Button>
        </DialogFooter>
      </div>
    </>
  );
};
