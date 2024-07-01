import { Dialog, DialogContent, useToast } from '@v4company/ui-components';
import { Amount } from './Amount';
import { useCallback, useEffect, useState } from 'react';
import { Summary } from './Summary';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Resume } from './Resume';
import {
  addFunds,
  createAccount,
  verifyAccount,
} from '../../../../common/services/requests';
import { PaymentDetails } from '../../../../common/types';
import { Form } from '@v4company/ui-components/components/ui/form';
import { bankSlipOrPixSchema } from '../../constants';
import { useQuery } from '@tanstack/react-query';
import { Account } from './Account';

interface DepositModalProps {
  onClose: () => void;
  isOpen: boolean;
  depositType: 'pix' | 'bank_slip';
}

export interface IFormInputs {
  value?: string;
  email?: string;
  expires?: Date;
  telephone?: string;
  bank?: string;
  bankAg?: string;
  accontType?: string;
  bankCC?: string;
  respName?: string;
  respCpf?: string;
}

export const DepositModal = ({
  onClose,
  isOpen,
  depositType,
}: DepositModalProps) => {
  const [stepSelect, setStepSelect] = useState<string>('amount');
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>(
    {} as PaymentDetails
  );
  const schema = bankSlipOrPixSchema[stepSelect]?.schema;

  const { toast } = useToast();

  const { data: isVerified } = useQuery({
    queryKey: ['verify-account'],
    queryFn: async () => {
      return await verifyAccount();
    },
  });

  const form = useForm<IFormInputs>({
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
        title: 'Erro ao configurar conta bancária',
        description:
          'Tente novamente mais tarde, se o erro persistir, entre em contato com o suporte.',
        variant: 'destructive',
      });
      return;
    }

    setStepSelect('summary');
  }, [form, toast]);

  const onSubmit: SubmitHandler<IFormInputs> = useCallback(async () => {
    if (stepSelect === 'account') {
      handleSendBankAccount();
    }

    if (!isVerified?.verified) {
      toast({
        title: 'Conta ainda não verificada',
        description: 'Adicione uma conta bancária para continuar',
        variant: 'destructive',
      });
      setStepSelect('account');
      return;
    }
    setStepSelect('summary');
  }, [handleSendBankAccount, isVerified?.verified, stepSelect, toast]);

  const handleSendDeposit = useCallback(async () => {
    const paymentObject = {
      value: Number(form.getValues('value')?.replace(/\D/g, '')),
      dueDate: form.getValues('expires') as Date,
      valueWithIncrease: 1,
      payableWith: depositType,
      useUnitAddress: true,
      useAuthenticatedUser: true,
    };

    const paymentDetails = await addFunds(paymentObject);

    if (paymentDetails.error || !paymentDetails.data) {
      toast({
        title: 'Erro',
        description: 'Erro ao processar pagamento',
        variant: 'destructive',
      });
      setStepSelect('summary');
    }

    if (paymentDetails.data) {
      setPaymentDetails(paymentDetails.data);
      setStepSelect('resume');
    }
  }, [depositType, form, toast]);

  const steps: Record<string, { component: JSX.Element }> = {
    amount: {
      component: (
        <Amount
          onSubmit={onSubmit}
          form={form}
        />
      ),
    },
    account: {
      component: (
        <Account
          setStepSelect={setStepSelect}
          form={form}
          onSubmit={onSubmit}
        />
      ),
    },
    summary: {
      component: (
        <Summary
          getValues={form.getValues}
          setStepSelect={setStepSelect}
          depositType={depositType}
          handleSendDeposit={handleSendDeposit}
        />
      ),
    },
    resume: {
      component: (
        <Resume
          depositType={depositType}
          onClose={onClose}
          paymentDetails={paymentDetails}
        />
      ),
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
