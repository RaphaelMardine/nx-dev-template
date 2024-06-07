import {
  Dialog,
  DialogContent,
  Form,
  useToast,
} from '@v4company/ui-components';
import { Amount } from './Amount';
import { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createAccount, verifyAccount } from '../../../../common/services/';
import { BalanceWallet } from '@v4company/types';
import { Account } from './Account';
import { Summary } from './Summary';
import { Loading } from './Loading';
import { ErrorWithdraw } from './ErrorWithdraw';
import { useQuery } from '@tanstack/react-query';
import { newWithdraw } from '../../../../common/services/requests/newWithdraw';
import { withdrawSchema } from '../../constants';
import { InfoWithdraw } from './InfoWithdraw';

interface DepositModalProps {
  onClose: () => void;
  isOpen: boolean;
  balance: BalanceWallet;
}

export interface IFormWithdrawInputs {
  value?: string;
  telephone?: string;
  bank?: string;
  bankAg?: string;
  accontType?: string;
  bankCC?: string;
  respName?: string;
  respCpf?: string;
  email?: string;
}

export const WithdrawModal = ({
  onClose,
  isOpen,
  balance,
}: DepositModalProps) => {
  const [stepSelect, setStepSelect] = useState<string>('amount');
  const totalBalance = balance?.available + balance?.bonusAmount;
  const schema = withdrawSchema[stepSelect]?.schema;

  const { toast } = useToast();

  const form = useForm<IFormWithdrawInputs>({
    resolver: zodResolver(schema),
  });

  const handleSendBankAccount = useCallback(async () => {
    const bankAccount = {
      unitId: '0b62af3b-da1c-4e64-82de-326e86aa48ea',
      telephone: form.getValues('telephone'),
      bank: form.getValues('bank'),
      bankAg: form.getValues('bankAg'),
      accountType: form.getValues('accontType'),
      bankCc: form.getValues('bankCC'),
      respName: form.getValues('respName'),
    };

    const response = await createAccount(bankAccount);

    if (response.error) {
      toast({
        title: 'Erro',
        description: 'Erro ao processar solicitação de saque',
        variant: 'destructive',
      });
      return;
    }

    setStepSelect('summary');
  }, [form, toast]);

  const { data: isVerified } = useQuery({
    queryKey: ['verify-account'],
    queryFn: async () => {
      return await verifyAccount();
    },
  });

  const onSubmit: SubmitHandler<IFormWithdrawInputs> = useCallback(
    async (data: IFormWithdrawInputs) => {
      if (schema.parse(data)) {
        const nextStepAction: Record<string, { action: () => void }> = {
          amount: {
            action: () => {
              if (
                Number(form.getValues('value')?.replace(/\D/g, '')) >
                totalBalance
              ) {
                toast({
                  title: 'Saldo insuficiente',
                  description: 'Saldo insuficiente para realizar o saque',
                  variant: 'destructive',
                });
                return;
              }
              setStepSelect('account');
            },
          },
          account: {
            action: () => {
              if (!isVerified?.verified) {
                handleSendBankAccount();
                return;
              }
              setStepSelect('summary');
            },
          },
        };

        nextStepAction[stepSelect].action();
      }
    },
    [
      form,
      handleSendBankAccount,
      isVerified,
      schema,
      stepSelect,
      toast,
      totalBalance,
    ]
  );

  const handleSendWithdraw = useCallback(async () => {
    setStepSelect('loading');
    const value = Number(form.getValues('value')?.replace(/\D/g, ''));
    const withdrawDetails = await newWithdraw(value);

    if (withdrawDetails.error || !withdrawDetails.data) {
      setStepSelect('summary');
    }

    if (withdrawDetails.data) {
      setStepSelect('infoWithdraw');
    }
  }, [form, onClose]);

  const steps: Record<string, { component: JSX.Element }> = {
    amount: {
      component: (
        <Amount
          onSubmit={onSubmit}
          form={form}
          balance={balance}
        />
      ),
    },
    account: {
      component: (
        <Account
          onSubmit={onSubmit}
          form={form}
          setStepSelect={setStepSelect}
        />
      ),
    },
    summary: {
      component: (
        <Summary
          setStepSelect={setStepSelect}
          form={form}
          handleSendWithdraw={handleSendWithdraw}
        />
      ),
    },
    infoWithdraw: {
      component: <InfoWithdraw />,
    },
    loading: {
      component: <Loading />,
    },
    errorWithdraw: {
      component: <ErrorWithdraw handleSendWithdraw={handleSendWithdraw} />,
    },
  };

  useEffect(() => {
    if (!isOpen) {
      setStepSelect('amount');
    }
  }, [isOpen]);

  return (
    <Dialog
      onOpenChange={onClose}
      open={isOpen}
      modal
      defaultOpen={isOpen}
    >
      <DialogContent className="min-w-[40%] max-h-screen">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {isOpen && steps[stepSelect].component}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
