import {
  Button,
  DatePicker,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  MoneyInput,
} from '@v4company/ui-components';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import { IFormInputs } from '..';
import { useAuth } from '@v4company/contexts';
import { ChevronRight } from 'lucide-react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@v4company/ui-components/components/ui/form';

interface AmountProps {
  onSubmit: SubmitHandler<IFormInputs>;
  form: UseFormReturn<IFormInputs>;
}

export const Amount = ({ onSubmit, form }: AmountProps) => {
  const { user } = useAuth();
  return (
    <>
      <DialogHeader className="relative pt-4 pb-4 pl-6 -m-6 shadow-m">
        <DialogTitle className="flex items-center">
          <h4>Depósito</h4>
        </DialogTitle>
      </DialogHeader>
      <div>
        <div className="mt-6 mb-4 -m-6">
          <div className="h-2 bg-black w-[50%] rounded-r-full" />
        </div>
        <div className="flex flex-col max-h-screen gap-6 pb-20 overflow-y-auto">
          <p className="text-xl font-bold">Defina o valor de depósito</p>
          <div className="w-1/2">
            <MoneyInput
              form={form}
              name="value"
              label="Qual o valor do depósito*"
              placeholder="R$ 0,00"
              decimal={2}
            />
          </div>
          <p className="text-xl font-bold">Preencha seus dados</p>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="text-sm font-bold">E-mail</FormLabel>
                  <Input
                    className="w-1/2"
                    placeholder="seu@email.com"
                    type="email"
                    {...field}
                  />
                  {form.formState.errors.email?.message && (
                    <FormMessage className="text-destructive">
                      {form.formState.errors.email?.message}
                    </FormMessage>
                  )}
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="expires"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="text-sm font-bold ">
                    Data de vencimento
                  </FormLabel>
                  <div>
                    <DatePicker
                      date={field.value}
                      setDate={field.onChange}
                      {...field}
                    />
                  </div>
                  {form.formState.errors.expires?.message && (
                    <FormMessage className="text-destructive">
                      {form.formState.errors.expires?.message}
                    </FormMessage>
                  )}
                </FormItem>
              );
            }}
          />
          <div>
            <p className="text-sm font-bold ">Unidade</p>
            <p>{user.unit?.name}</p>
          </div>
          <div>
            <p className="text-sm font-bold ">CNPJ</p>
            <p>{user.unit?.cnpj}</p>
          </div>
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
            Seguir para resumo <ChevronRight size={16} />
          </Button>
        </DialogFooter>
      </div>
    </>
  );
};
