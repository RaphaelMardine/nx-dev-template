import { Dispatch, SetStateAction, useState } from 'react';
import {
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  ScrollArea,
} from '@v4company/ui-components';
import { AlertCircle, Download, X } from 'lucide-react';
import { TransactionsResponse } from '../../../../common/types';
import { badge } from '../../constants';
import {
  convertCentsToBRL,
  formatDate,
  formatTimeSeconds,
} from '@v4company/utils';
import { Avatar } from '@v4company/ui-components';
import { postPdfReceipt } from '../../../../common/services';
import { getInitialAvatar, getTypeTransaction } from '../../utils';
import { useAuth } from '@v4company/contexts';

interface BalanceDrawerProps {
  transactionDrawerOpen: boolean;
  setTransactionDrawerOpen: Dispatch<SetStateAction<boolean>>;
  transaction: TransactionsResponse;
}

export const TransactionDetailsDrawer = ({
  transactionDrawerOpen,
  setTransactionDrawerOpen,
  transaction,
}: BalanceDrawerProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleDownloadReceipt = async () => {
    setLoading(true);
    const pdf = await postPdfReceipt(
      transaction?._id,
      transaction?.wasReimbursed || false
    );

    const buffer = new Blob([new Uint8Array(pdf.data)], {
      type: 'application/pdf',
    });

    const url = URL.createObjectURL(buffer);

    window.open(url, '_blank');
    setLoading(false);
  };

  const transactionStatus = transaction?.status;
  return (
    <Drawer
      direction="right"
      dismissible={false}
      open={transactionDrawerOpen}
      onOpenChange={(open) => setTransactionDrawerOpen(open)}
      onClose={() => setTransactionDrawerOpen(false)}
    >
      <DrawerContent className="top-0 right-0 left-auto h-screen mt-0 rounded-lg rounded-r-none lg:w-1/3">
        <DrawerHeader className="gap-6">
          <DrawerTitle className="flex items-center justify-between">
            <p className="text-xl font-bold">
              {transaction?.transactionFlow === 'INPUT' ? 'Depósito' : 'Saque'}
            </p>
            <DrawerClose>
              <X
                onClick={() => setTransactionDrawerOpen(false)}
                size={20}
              />
            </DrawerClose>
          </DrawerTitle>
          <DrawerDescription className="flex items-center justify-between gap-3 text-primary">
            <Badge
              className="flex items-center gap-1 px-2 py-1 text-xs rounded-full"
              variant={badge[transactionStatus]?.variant}
            >
              {badge[transactionStatus]?.icon}
              {badge[transactionStatus]?.label}
            </Badge>
            <div className="flex flex-col items-end">
              <p className="text-sm font-light">ID {transaction?._id}</p>
              <p className="text-sm font-bold">
                {formatDate(transaction?.createdAt || new Date())} -{' '}
                {formatTimeSeconds(transaction?.createdAt || new Date())}
              </p>
            </div>
          </DrawerDescription>
        </DrawerHeader>

        <ScrollArea>
          <div className="flex flex-col gap-6 p-4 m-4 border-2 rounded-lg">
            <div className="flex items-center gap-2">
              <div>
                <AlertCircle size={16} />
              </div>
              <p className="text-sm font-bold">Informações da transação</p>
            </div>
            <div className="flex justify-between">
              <div className="w-full">
                <p className="text-sm font-bold">Autor:</p>
                <div className="flex items-center gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage
                      src={transaction?.user?.picture}
                      alt="Imagem do autor da transação"
                    />
                    <AvatarFallback className="text-xs">
                      {getInitialAvatar(transaction?.user?.name || '')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-normal">
                    {transaction?.user?.name}
                  </span>
                </div>
              </div>
              <div className="w-full">
                <p className="text-sm font-bold">E-mail:</p>
                <span className="text-sm font-normal">
                  {transaction?.user?.email}
                </span>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="w-full">
                <p className="text-sm font-bold">CNPJ:</p>
                <span className="text-sm font-normal">{user?.unit.cnpj}</span>
              </div>
              <div className="w-full">
                <p className="text-sm font-bold">Tipo:</p>
                <span className="text-sm font-normal">
                  {getTypeTransaction({
                    type: transaction?.type,
                    method: transaction?.depositMethod,
                  })}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6 p-4 m-4 border-2 rounded-lg">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-bold">Valor do depósito:</p>
                <span className="text-sm font-normal">Taxas IUGU</span>
              </div>
              <div>
                <p className="text-sm font-bold">
                  {convertCentsToBRL(transaction?.amount)}
                </p>
                <span className="text-sm font-normal">-</span>
              </div>
            </div>
            <hr />
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-bold">
                  Valor de entrada na carteira:
                </p>
              </div>
              <div>
                <p className="text-sm font-bold">
                  {convertCentsToBRL(transaction?.amount)}
                </p>
              </div>
            </div>
          </div>
        </ScrollArea>
        <DrawerFooter>
          {transactionStatus === 'FINISHED' && (
            <div className="flex justify-end">
              <Button
                variant="destructive"
                className="gap-2 rounded-full"
                disabled={loading}
                onClick={handleDownloadReceipt}
              >
                Baixar comprovante <Download size={16} />
              </Button>
            </div>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
