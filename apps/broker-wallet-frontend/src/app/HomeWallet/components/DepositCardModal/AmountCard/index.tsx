import {
  Button,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  MoneyInput,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@v4company/ui-components';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import { Dispatch, SetStateAction, useMemo } from 'react';
import { IFormCardInputs } from '..';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { interestRates } from '../../../utils';

interface AmountCardProps {
  setStepSelect: Dispatch<SetStateAction<string>>;
  onSubmit: SubmitHandler<IFormCardInputs>;
  form: UseFormReturn<IFormCardInputs>;
}

export const AmountCard = ({
  setStepSelect,
  onSubmit,
  form,
}: AmountCardProps) => {
  const value = form.watch('value') || '0';
  const disabledInstallments = Number(value?.replace(/\D/g, '') || 0) < 100;

  const instalments = useMemo(() => {
    const amount = Number(value?.replace(/\D/g, '')) / 100;

    const calculateInstallment = () => {
      if (amount / 3 >= 5) {
        return [1, 2, 3];
      }
      if (amount / 2 >= 5) {
        return [1, 2];
      }
      return [1];
    };

    const options = calculateInstallment().map((installment, index) => {
      const installmentAmount = (
        (amount * (1 + interestRates[index] / 100)) /
        installment
      ).toFixed(2);
      const totalValue =
        index > 0
          ? `(R$ ${(amount * (1 + interestRates[index] / 100)).toFixed(2)})`
          : '';
      return `${installment}x R$ ${installmentAmount} ${totalValue}`;
    });
    return options;
  }, [value]);

  return (
    <>
      <DialogHeader className="relative pt-4 pb-4 pl-6 -m-6 shadow-m">
        <DialogTitle className="flex items-center">
          <Button
            variant="link"
            onClick={() => setStepSelect('infoCard')}
            className="pl-0"
          >
            <ChevronLeft size={24} />
          </Button>
          <h4>Depósito</h4>
        </DialogTitle>
      </DialogHeader>
      <div>
        <div className="mt-6 mb-4 -m-6">
          <div className="h-2 bg-black w-[70%] rounded-r-full" />
        </div>
        <div className="flex flex-col max-h-screen gap-6 pb-20 overflow-y-auto">
          <p className="text-xl font-bold">Parcelamento</p>
          <div className="w-1/2">
            <MoneyInput
              form={form}
              name="value"
              label="Qual o valor do depósito*"
              placeholder="R$ 0,00"
              decimal={2}
            />
          </div>
          <FormField
            control={form.control}
            name="installments"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="text-sm font-bold whitespace-nowrap">
                    Quantidade de parcelas*
                  </FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    defaultValue={field.value}
                    disabled={disabledInstallments}
                  >
                    <SelectTrigger className="w-2/5">
                      <SelectValue placeholder="Escolha" />
                    </SelectTrigger>
                    <SelectContent>
                      {instalments.map((installment, index) => (
                        <SelectItem
                          key={index}
                          value={String(index + 1)}
                        >
                          {installment}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {form.formState.errors.installments?.message && (
                    <FormMessage className="text-destructive">
                      {form.formState.errors.installments?.message}
                    </FormMessage>
                  )}
                </FormItem>
              );
            }}
          />
        </div>
        <DialogFooter className="absolute bottom-0 left-0 right-0 p-6 mt-6 shadow-m">
          <Button
            type="submit"
            variant="destructive"
            className="flex items-center gap-2 rounded-full"
            onClick={() => {
              form.handleSubmit(onSubmit);
            }}
          >
            Seguinte <ChevronRight size={16} />
          </Button>
        </DialogFooter>
      </div>
    </>
  );
};
