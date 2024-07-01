import { Dialog, DialogContent, useToast } from '@v4company/ui-components';
import { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Form } from '@v4company/ui-components/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  addFunds,
  createAccount,
  verifyAccount,
} from '../../../../common/services/requests';
import { PaymentDetails } from '../../../../common/types';
import { Address } from './Address';
import { PropertyCard } from './PropertyCard';
import { InfoCard } from './InfoCard';
import { interestRates, removeFirstWord } from '../../utils';
import { AmountCard } from './AmountCard';
import { Summary } from './Summary';
import { Loading } from './Loading';
import { ErrorCard } from './ErrorCard';
import { Resume } from './Resume';
import { cardSchema } from '../../constants';
import { useQuery } from '@tanstack/react-query';
import { Account } from './Account';

interface DepositCardModalProps {
  onClose: () => void;
  isOpen: boolean;
}

export interface IFormCardInputs {
  cep: string;
  city: string;
  neighborhood: string;
  state: string;
  street: string;
  number: string;
  complement: string;
  name: string;
  email: string;
  cpfOrCnpj: string;
  phone: string;
  cardName: string;
  cardNumber: string;
  cardMonthExpiration: string;
  cardYearExpiration: number;
  cardCvv: number;
  cardToken: string;
  value: string;
  installments: string;
  telephone: string;
  bank?: string;
  bankAg?: string;
  accontType?: string;
  bankCC?: string;
  respName?: string;
}

export const DepositCardModal = ({
  onClose,
  isOpen,
}: DepositCardModalProps) => {
  const [errorCode, setErrorCode] = useState<string>('');
  const [stepSelect, setStepSelect] = useState<string>('address');
  const schema = cardSchema[stepSelect]?.schema;
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>(
    {} as PaymentDetails
  );
  const { toast } = useToast();

  const { data: isVerified } = useQuery({
    queryKey: ['verify-account'],
    queryFn: async () => {
      return await verifyAccount();
    },
  });

  const form = useForm<IFormCardInputs>({
    resolver: zodResolver(schema),
  });

  const getToken = useCallback(async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const cc = Iugu.CreditCard(
      form.getValues('cardNumber'),
      form.getValues('cardMonthExpiration'),
      form.getValues('cardYearExpiration'),
      form.getValues('cardName')?.split(' ')[0],
      removeFirstWord(form.getValues('cardName') || ''),
      form.getValues('cardCvv')
    );

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    Iugu.createPaymentToken(cc, function (response) {
      if (response.errors) {
        toast({
          title: 'Erro',
          description: 'Dados invalidos do cartão de crédito',
          variant: 'destructive',
        });
      } else {
        form.setValue('cardToken', response.id);
        setStepSelect('amountCard');
      }
    });
  }, [form, toast]);

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

    setStepSelect('propertyCard');
  }, [form, toast]);

  const onSubmit: SubmitHandler<IFormCardInputs> = useCallback(
    async (data: IFormCardInputs) => {
      if (schema.parse(data)) {
        const nextStepAction: Record<string, { action: () => void }> = {
          address: {
            action: () => {
              if (!isVerified?.verified) {
                toast({
                  title: 'Conta ainda não verificada',
                  description: 'Adicione uma conta bancária para continuar',
                  variant: 'destructive',
                });
                setStepSelect('account');
                return;
              }
              setStepSelect('propertyCard');
            },
          },
          account: { action: () => handleSendBankAccount() },
          propertyCard: { action: () => setStepSelect('infoCard') },
          infoCard: { action: () => getToken() },
          amountCard: { action: () => setStepSelect('summary') },
        };

        nextStepAction[stepSelect].action();
      }
    },
    [
      getToken,
      handleSendBankAccount,
      isVerified?.verified,
      schema,
      stepSelect,
      toast,
    ]
  );

  const calculateTotalValue = useCallback(() => {
    const value = Number(form.getValues('value')?.replace(/\D/g, '')) / 100;
    const rates = interestRates[Number(form.getValues('installments')) - 1];
    const newValue = (value * rates) / 100;
    return value + Number(newValue.toFixed(2));
  }, [form]);

  const handleSendDeposit = useCallback(async () => {
    setStepSelect('loading');
    const value = Number(form.getValues('value')?.replace(/\D/g, ''));

    const paymentObject = {
      valueWithIncrease: Math.trunc(calculateTotalValue() * 100),
      value: Math.trunc(value),
      dueDate: new Date(),
      payableWith: 'credit_card',
      installments: Number(form.getValues('installments')),
      maxInstallmentsValue: Number(form.getValues('installments')),
      useUnitAddress: false,
      useAuthenticatedUser: false,
      payer: {
        cpfCnpj: form.getValues('cpfOrCnpj'),
        name: form.getValues('name'),
        phonePrefix: form.getValues('phone')?.split(' ')[0],
        phone: form.getValues('phone')?.split(' ')[1],
        email: form.getValues('email'),
      },
      billingAddress: {
        city: form.getValues('city'),
        complement: form.getValues('complement'),
        country: 'Brasil',
        state: form.getValues('state'),
        number: form.getValues('number'),
        district: form.getValues('neighborhood'),
        street: form.getValues('street'),
        zipCode: form.getValues('cep'),
      },
      card: {
        data: { creditCardToken: form.getValues('cardToken') },
      },
    };

    const paymentDetails = await addFunds(paymentObject);
    if (paymentDetails.error || !paymentDetails.data) {
      toast({
        title: 'Erro',
        description: 'Erro ao processar pagamento',
        variant: 'destructive',
      });
      setErrorCode(paymentDetails?.error?.errorCode as string);
      setStepSelect('errorCard');
      return;
    }

    if (paymentDetails.data) {
      setPaymentDetails(paymentDetails.data);
      setStepSelect('resume');
    }
  }, [calculateTotalValue, form, toast]);

  const steps: Record<string, { component: JSX.Element }> = {
    address: {
      component: (
        <Address
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
    propertyCard: {
      component: (
        <PropertyCard
          setStepSelect={setStepSelect}
          onSubmit={onSubmit}
          form={form}
        />
      ),
    },
    infoCard: {
      component: (
        <InfoCard
          setStepSelect={setStepSelect}
          form={form}
          onSubmit={onSubmit}
        />
      ),
    },
    amountCard: {
      component: (
        <AmountCard
          setStepSelect={setStepSelect}
          onSubmit={onSubmit}
          form={form}
        />
      ),
    },
    summary: {
      component: (
        <Summary
          setStepSelect={setStepSelect}
          form={form}
          handleSendDeposit={handleSendDeposit}
        />
      ),
    },
    loading: {
      component: <Loading />,
    },
    errorCard: {
      component: <ErrorCard errorCode={errorCode} />,
    },
    resume: {
      component: (
        <Resume
          form={form}
          onClose={onClose}
          paymentDetails={paymentDetails}
        />
      ),
    },
  };

  useEffect(() => {
    if (!isOpen) {
      setStepSelect('address');
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
