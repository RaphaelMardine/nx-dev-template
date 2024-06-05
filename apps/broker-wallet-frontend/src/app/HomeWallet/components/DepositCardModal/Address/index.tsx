import {
  Button,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@v4company/ui-components';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import { IFormCardInputs } from '..';
import { ChevronRight } from 'lucide-react';
import { maskCep } from '@v4company/utils';
import { getAddressByCep } from '@v4company/services';

interface AddressProps {
  onSubmit: SubmitHandler<IFormCardInputs>;
  form: UseFormReturn<IFormCardInputs>;
}

export const Address = ({ onSubmit, form }: AddressProps) => {
  const setAddressByCep = async (value: string) => {
    const { city, neighborhood, state, street } = await getAddressByCep(value);
    form.setValue('city', city);
    form.setValue('neighborhood', neighborhood);
    form.setValue('state', state);
    form.setValue('street', street);
  };
  return (
    <>
      <DialogHeader className="relative pt-4 pb-4 pl-6 -m-6 shadow-m">
        <DialogTitle className="flex items-center">
          <h4>Depósito</h4>
        </DialogTitle>
      </DialogHeader>
      <div>
        <div className="mt-6 mb-4 -m-6">
          <div className="h-2 bg-black w-[20%] rounded-r-full" />
        </div>
        <div className="flex flex-col max-h-screen gap-6 pb-20 overflow-y-auto">
          <p className="text-xl font-bold">Endereço de cobrança</p>
          <div className="flex w-full gap-4">
            <FormField
              control={form.control}
              name="cep"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel className="text-sm font-bold ">CEP*</FormLabel>
                    <Input
                      placeholder="00000-000"
                      {...field}
                      onChange={async (e) => {
                        const value = e.target.value;
                        field.onChange(maskCep(value));
                        if (value.length === 9) {
                          await setAddressByCep(value);
                        }
                      }}
                    />
                    {form.formState.errors.cep?.message && (
                      <FormMessage className="text-destructive">
                        {form.formState.errors.cep?.message}
                      </FormMessage>
                    )}
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel className="text-sm font-bold ">
                      Cidade*
                    </FormLabel>
                    <Input
                      placeholder="Digite o nome da cidade"
                      {...field}
                    />
                    {form.formState.errors.city?.message && (
                      <FormMessage className="text-destructive">
                        {form.formState.errors.city?.message}
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
              name="neighborhood"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel className="text-sm font-bold ">
                      Bairro*
                    </FormLabel>
                    <Input
                      placeholder="Digite o nome do bairro"
                      {...field}
                    />
                    {form.formState.errors.neighborhood?.message && (
                      <FormMessage className="text-destructive">
                        {form.formState.errors.neighborhood?.message}
                      </FormMessage>
                    )}
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel className="text-sm font-bold ">
                      Estado*
                    </FormLabel>
                    <Input
                      placeholder="Digite o nome do estado"
                      {...field}
                    />
                    {form.formState.errors.state?.message && (
                      <FormMessage className="text-destructive">
                        {form.formState.errors.state?.message}
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
              name="street"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel className="text-sm font-bold ">Rua*</FormLabel>
                    <Input
                      placeholder="Digite o nome da rua"
                      {...field}
                    />
                    {form.formState.errors.street?.message && (
                      <FormMessage className="text-destructive">
                        {form.formState.errors.street?.message}
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
              name="number"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel className="text-sm font-bold ">
                      Número*
                    </FormLabel>
                    <Input
                      placeholder="Digite o número da rua"
                      {...field}
                    />
                    {form.formState.errors.number?.message && (
                      <FormMessage className="text-destructive">
                        {form.formState.errors.number?.message}
                      </FormMessage>
                    )}
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="complement"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel className="text-sm font-bold ">
                      Complemento
                    </FormLabel>
                    <Input
                      placeholder="Digite um complemento para o endereço"
                      {...field}
                    />
                    {form.formState.errors.complement?.message && (
                      <FormMessage className="text-destructive">
                        {form.formState.errors.complement?.message}
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
