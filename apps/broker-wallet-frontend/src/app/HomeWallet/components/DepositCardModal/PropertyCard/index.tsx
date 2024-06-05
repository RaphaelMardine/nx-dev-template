import {
  Button,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from '@v4company/ui-components';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import { Dispatch, SetStateAction } from 'react';
import { IFormCardInputs } from '..';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { maskCnpj, maskCpf, maskPhone } from '@v4company/utils';

interface PropertyCardProps {
  setStepSelect: Dispatch<SetStateAction<string>>;
  onSubmit: SubmitHandler<IFormCardInputs>;
  form: UseFormReturn<IFormCardInputs>;
}

export const PropertyCard = ({
  setStepSelect,
  onSubmit,
  form,
}: PropertyCardProps) => {
  return (
    <>
      <DialogHeader className="relative pt-4 pb-4 pl-6 -m-6 shadow-m">
        <DialogTitle className="flex items-center">
          <Button
            variant="link"
            onClick={() => setStepSelect('address')}
            className="pl-0"
          >
            <ChevronLeft size={24} />
          </Button>
          <h4>Depósito</h4>
        </DialogTitle>
      </DialogHeader>
      <div>
        <div className="mt-6 mb-4 -m-6">
          <div className="h-2 bg-black w-[40%] rounded-r-full" />
        </div>
        <div className="flex flex-col max-h-screen gap-6 pb-20 overflow-y-auto">
          <p className="text-xl font-bold">Dados do proprietário do cartão</p>
          <div className="flex w-full gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel className="text-sm font-bold ">
                      Nome completo*
                    </FormLabel>
                    <Input
                      placeholder="Nome do proprietário do cartão"
                      {...field}
                    />
                    {form.formState.errors.name?.message && (
                      <FormMessage className="text-destructive">
                        {form.formState.errors.name?.message}
                      </FormMessage>
                    )}
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel className="text-sm font-bold ">
                      E-mail*
                    </FormLabel>
                    <Input
                      placeholder="Digite seu e-mail"
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
          </div>
          <div className="flex w-full gap-4">
            <FormField
              control={form.control}
              name="cpfOrCnpj"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel className="text-sm font-bold ">
                      CPF ou CNPJ*
                    </FormLabel>
                    <Input
                      placeholder="Digite o cpf ou cnpj"
                      {...field}
                      onChange={(e) => {
                        const { value } = e.target;
                        if (value.length > 14) {
                          field.onChange(maskCnpj(value));
                        } else {
                          field.onChange(maskCpf(value));
                        }
                      }}
                    />
                    {form.formState.errors.cpfOrCnpj?.message && (
                      <FormMessage className="text-destructive">
                        {form.formState.errors.cpfOrCnpj?.message}
                      </FormMessage>
                    )}
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel className="text-sm font-bold ">
                      Telefone*
                    </FormLabel>
                    <Input
                      placeholder="(00) 00000-0000"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(maskPhone(value));
                      }}
                    />
                    {form.formState.errors.phone?.message && (
                      <FormMessage className="text-destructive">
                        {form.formState.errors.phone?.message}
                      </FormMessage>
                    )}
                  </FormItem>
                );
              }}
            />
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
            Seguinte <ChevronRight size={16} />
          </Button>
        </DialogFooter>
      </div>
    </>
  );
};
