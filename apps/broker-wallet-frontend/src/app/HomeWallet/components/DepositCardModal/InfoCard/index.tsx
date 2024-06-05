import {
  Button,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  FormItem,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  FormField,
  FormLabel,
  FormMessage,
} from '@v4company/ui-components';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import { Dispatch, SetStateAction } from 'react';
import { IFormCardInputs } from '..';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { getCardTypeIcon } from '../../../utils';
import { maskCreditCard } from '@v4company/utils';

interface InfoCardProps {
  setStepSelect: Dispatch<SetStateAction<string>>;
  onSubmit: SubmitHandler<IFormCardInputs>;
  form: UseFormReturn<IFormCardInputs>;
}

export const InfoCard = ({ setStepSelect, onSubmit, form }: InfoCardProps) => {
  return (
    <>
      <DialogHeader className="relative pt-4 pb-4 pl-6 -m-6 shadow-m">
        <DialogTitle className="flex items-center">
          <Button
            variant="link"
            onClick={() => setStepSelect('propertyCard')}
            className="pl-0"
          >
            <ChevronLeft size={24} />
          </Button>
          <h4>Depósito</h4>
        </DialogTitle>
      </DialogHeader>
      <div>
        <div className="mt-6 mb-4 -m-6">
          <div className="h-2 bg-black w-[60%] rounded-r-full" />
        </div>
        <div className="flex flex-col max-h-screen gap-6 pb-20 overflow-y-auto">
          <p className="text-xl font-bold">Dados do cartão</p>
          <div className="flex w-full gap-4">
            <FormField
              control={form.control}
              name="cardName"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel className="text-sm font-bold ">
                      Nome no cartão*
                    </FormLabel>
                    <Input
                      placeholder="Digite o nome que está no cartão"
                      {...field}
                    />
                    {form.formState.errors.cardName?.message && (
                      <FormMessage className="text-destructive">
                        {form.formState.errors.cardName?.message}
                      </FormMessage>
                    )}
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel className="text-sm font-bold ">
                      Número do cartão*
                    </FormLabel>
                    <div className="flex gap-2">
                      <Input
                        placeholder="3123 xxxx xxxx 3123"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(maskCreditCard(value));
                        }}
                      />
                      <Image
                        src={getCardTypeIcon(
                          field.value
                            ? field.value.replace(/\s/g, '').slice(0, 6)
                            : ''
                        )}
                        alt="icon-card"
                        className="w-8"
                      />
                    </div>
                    {form.formState.errors.cardNumber?.message && (
                      <FormMessage className="text-destructive">
                        {form.formState.errors.cardNumber?.message}
                      </FormMessage>
                    )}
                  </FormItem>
                );
              }}
            />
          </div>
          <div className="flex items-end w-full gap-4">
            <FormField
              control={form.control}
              name="cardMonthExpiration"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel className="text-sm font-bold whitespace-nowrap">
                      Data de vencimento*
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Mês" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="01">Janeiro</SelectItem>
                        <SelectItem value="02">Fevereiro</SelectItem>
                        <SelectItem value="03">Março</SelectItem>
                        <SelectItem value="04">Abril</SelectItem>
                        <SelectItem value="05">Maio</SelectItem>
                        <SelectItem value="06">Junho</SelectItem>
                        <SelectItem value="07">Julho</SelectItem>
                        <SelectItem value="08">Agosto</SelectItem>
                        <SelectItem value="09">Setembro</SelectItem>
                        <SelectItem value="10">Outubro</SelectItem>
                        <SelectItem value="11">Novembro</SelectItem>
                        <SelectItem value="12">Dezembro</SelectItem>
                      </SelectContent>
                    </Select>

                    {form.formState.errors.cardMonthExpiration?.message && (
                      <FormMessage className="text-destructive">
                        {form.formState.errors.cardMonthExpiration?.message}
                      </FormMessage>
                    )}
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="cardYearExpiration"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <Input
                      placeholder="Ano"
                      type="number"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value.slice(0, 4));
                      }}
                    />
                    {form.formState.errors.cardYearExpiration?.message && (
                      <FormMessage className="text-destructive">
                        {form.formState.errors.cardYearExpiration?.message}
                      </FormMessage>
                    )}
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="cardCvv"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel className="text-sm font-bold whitespace-nowrap">
                      Código de segurança*
                    </FormLabel>
                    <Input
                      placeholder="000"
                      type="number"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value.slice(0, 4));
                      }}
                    />
                    {form.formState.errors.cardCvv?.message && (
                      <FormMessage className="text-destructive">
                        {form.formState.errors.cardCvv?.message}
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
