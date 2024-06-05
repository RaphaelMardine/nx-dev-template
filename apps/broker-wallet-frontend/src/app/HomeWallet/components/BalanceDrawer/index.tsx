import { Dispatch, SetStateAction } from 'react';
import { BalanceWallet } from '@v4company/types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  ScrollArea,
} from '@v4company/ui-components';
import { AlertCircle, Check, X } from 'lucide-react';
import { convertCentsToBRL, formatDate } from '@v4company/utils';

interface BalanceDrawerProps {
  balance: BalanceWallet;
  balanceDrawerOpen: boolean;
  setBalanceDrawerOpen: Dispatch<SetStateAction<boolean>>;
}

export const BalanceDrawer = ({
  balance,
  balanceDrawerOpen,
  setBalanceDrawerOpen,
}: BalanceDrawerProps) => {
  const totalBalance = balance?.available + balance?.bonusAmount;

  return (
    <Drawer
      direction="right"
      dismissible={false}
      open={balanceDrawerOpen}
      onOpenChange={(open) => setBalanceDrawerOpen(open)}
      onClose={() => setBalanceDrawerOpen(false)}
    >
      <DrawerContent className="top-0 right-0 left-auto h-screen mt-0 rounded-lg rounded-r-none lg:w-1/3">
        <DrawerHeader className="gap-6">
          <DrawerTitle className="flex items-center justify-between">
            <p className="text-xl font-bold">Detalhamento de saldo</p>
            <DrawerClose>
              <X
                onClick={() => setBalanceDrawerOpen(false)}
                size={20}
              />
            </DrawerClose>
          </DrawerTitle>
          <hr />
          <DrawerDescription className="flex items-center gap-3 text-primary">
            <div>
              <AlertCircle size={24} />
            </div>
            <span className="text-xs font-normal">
              Ao realizar ofertas no LeadBroker, primeiramente será descontado o
              saldo em créditos e depois em saques.
            </span>
          </DrawerDescription>
          <hr />
        </DrawerHeader>

        <ScrollArea>
          <div className="flex flex-col gap-6 p-4">
            <Accordion
              type="single"
              collapsible
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <div className="flex items-center justify-between w-full pr-2">
                    <p className="font-bold">Saldo Total</p>
                    <h4 className="flex items-center">
                      {convertCentsToBRL(totalBalance)}
                    </h4>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-8 ">
                  <div className="flex items-center justify-between w-full pr-2">
                    <div className="flex flex-col gap-2">
                      <p>Saque</p>
                      <p>Valor depositado para saque</p>
                    </div>
                    <h6 className="flex items-center">
                      {convertCentsToBRL(balance?.available)}
                    </h6>
                  </div>
                  <hr />
                  <div className="flex items-center justify-between w-full pr-2">
                    <div className="flex flex-col w-2/3 gap-2">
                      <p>Crédito bônus</p>
                      <p>
                        Crédito com data de expiração e sem possibilidade de
                        saque
                      </p>
                    </div>
                    <h6 className="flex items-center">
                      {convertCentsToBRL(balance?.bonusAmount)}
                    </h6>
                  </div>
                  {balance?.availableBonus?.length > 0 ? (
                    balance.availableBonus.map((bonus) => (
                      <div
                        key={bonus._id as string}
                        className="flex items-start justify-between w-full pr-2"
                      >
                        <div className="flex flex-col gap-2">
                          <p>Bônus</p>
                          <p>
                            Valor:{' '}
                            {convertCentsToBRL(bonus?.initialAmount as number)}
                          </p>
                        </div>
                        <span className="flex items-start gap-2 text-xs">
                          <b>Vencimento:</b>
                          {formatDate(bonus?.expiresAt as Date)}
                        </span>
                      </div>
                    ))
                  ) : (
                    <span>Você não possui bônus</span>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion
              type="single"
              collapsible
            >
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  <p className="font-bold">Histórico de créditos</p>
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-8 ">
                  {balance?.expiredBonus?.length > 0 ? (
                    balance.expiredBonus.map((bonus) => (
                      <div
                        key={bonus._id as string}
                        className="flex flex-col gap-2"
                      >
                        <div className="flex gap-2">
                          <Check
                            className="text-green-600"
                            size={24}
                          />
                          Bônus vencido
                        </div>
                        <hr />
                        <div className="flex items-start justify-between w-full pr-2">
                          <div className="flex flex-col gap-2">
                            <p>Bônus</p>
                            <p>
                              Valor:{' '}
                              {convertCentsToBRL(
                                bonus?.initialAmount as number
                              )}
                            </p>
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="flex items-start gap-2 text-xs">
                              <b>Disponibilidade:</b>
                              {formatDate(bonus?.createdAt as Date)}
                            </span>
                            <span className="flex items-start justify-end gap-2 text-xs">
                              <b>Vencimento:</b>
                              {formatDate(bonus?.expiresAt as Date)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <span>Você não possui bônus vencido</span>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </ScrollArea>
        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
