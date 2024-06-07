import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@v4company/ui-components';
import { maskCpf, maskPhone } from '@v4company/utils';
import { bankList } from '../../utils';
import { useAuth } from '@v4company/contexts';
import { UseFormReturn } from 'react-hook-form';
import { useState } from 'react';
import { maskAccount, maskAgency } from '../../utils/maskValidate';
export interface IFormInputsAccount {
  email?: string;
  telephone?: string;
  bank?: string;
  bankAg?: string;
  accontType?: string;
  bankCC?: string;
  respName?: string;
  respCpf?: string;
}

interface IAccountFields {
  form: UseFormReturn<Partial<IFormInputsAccount>>;
  disabled?: boolean;
}

export const AccountFields = ({ form, disabled }: IAccountFields) => {
  const { user } = useAuth();
  const [bankMasks, setBankMasks] = useState(bankList[0]);

  return (
    <div className="flex flex-col max-h-screen gap-6 pb-20 overflow-y-auto">
      {disabled ? (
        <p className="text-xl font-bold">Confira as informações bancárias</p>
      ) : (
        <p className="text-xl font-bold">Preencha as informações bancárias</p>
      )}
      <div className="flex w-full">
        <div className="w-full">
          <p className="text-sm font-bold ">Unidade</p>
          <p>{user.unit?.name}</p>
        </div>
        <div className="w-full">
          <p className="text-sm font-bold ">CNPJ</p>
          <p>{user.unit?.cnpj}</p>
        </div>
      </div>
      <div className="flex w-full gap-4">
        <FormField
          control={form.control}
          name="bank"
          render={({ field }) => {
            return (
              <FormItem className="w-full">
                <FormLabel className="text-sm font-bold ">
                  Nome do banco
                </FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    const [selectedBank] = bankList.filter(
                      (item) => item?.label === value
                    );
                    setBankMasks(selectedBank);
                  }}
                  defaultValue={'Banco do Brasil'}
                  disabled={disabled}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={
                        field.value ? field.value : 'Selecionar instituição'
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {bankList.map((installment, index) => (
                      <SelectItem
                        key={index}
                        value={installment.label}
                      >
                        {installment.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.bank?.message && (
                  <FormMessage className="text-destructive">
                    {form.formState.errors.bank?.message}
                  </FormMessage>
                )}
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="accontType"
          render={({ field }) => {
            return (
              <FormItem className="w-full">
                <FormLabel className="text-sm font-bold ">
                  Tipo de conta
                </FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  defaultValue={field.value}
                  disabled={disabled}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Conta corrente" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Corrente">Conta corrente</SelectItem>
                    <SelectItem value="Poupança">Conta poupança</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.accontType?.message && (
                  <FormMessage className="text-destructive">
                    {form.formState.errors.accontType?.message}
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
          name="bankAg"
          render={({ field }) => {
            return (
              <FormItem className="w-[40%]">
                <FormLabel className="text-sm font-bold ">Agência</FormLabel>
                <Input
                  placeholder={bankMasks?.value.placeholderAgency}
                  {...field}
                  disabled={disabled}
                  onChange={(e) => {
                    const value = e.target.value;
                    maskAgency(
                      value,
                      field,
                      bankMasks?.value.placeholderAgency
                    );
                  }}
                />
                {form.formState.errors.bankAg?.message && (
                  <FormMessage className="text-destructive">
                    {form.formState.errors.bankAg?.message}
                  </FormMessage>
                )}
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="bankCC"
          render={({ field }) => {
            return (
              <FormItem className="w-[60%]">
                <FormLabel className="text-sm font-bold ">
                  Número da conta
                </FormLabel>
                <Input
                  placeholder={bankMasks?.value.placeholderAccount}
                  {...field}
                  disabled={disabled}
                  onChange={(e) => {
                    const value = e.target.value;
                    maskAccount(
                      value,
                      field,
                      bankMasks?.value.placeholderAccount
                    );
                  }}
                />
                {form.formState.errors.bankCC?.message && (
                  <FormMessage className="text-destructive">
                    {form.formState.errors.bankCC?.message}
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
          name="respName"
          render={({ field }) => {
            return (
              <FormItem className="w-full">
                <FormLabel className="text-sm font-bold ">Nome</FormLabel>
                <Input
                  placeholder="Digite seu nome"
                  {...field}
                />
                {form.formState.errors.respName?.message && (
                  <FormMessage className="text-destructive">
                    {form.formState.errors.respName?.message}
                  </FormMessage>
                )}
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="respCpf"
          render={({ field }) => {
            return (
              <FormItem className="w-full">
                <FormLabel className="text-sm font-bold ">CPF</FormLabel>
                <Input
                  placeholder="Digite seu CPF"
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(maskCpf(value));
                  }}
                />
                {form.formState.errors.respCpf?.message && (
                  <FormMessage className="text-destructive">
                    {form.formState.errors.respCpf?.message}
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
          name="telephone"
          render={({ field }) => {
            return (
              <FormItem className="w-full">
                <FormLabel className="text-sm font-bold ">Telefone</FormLabel>
                <Input
                  placeholder="(00) 00000-0000"
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(maskPhone(value));
                  }}
                />
                {form.formState.errors.telephone?.message && (
                  <FormMessage className="text-destructive">
                    {form.formState.errors.telephone?.message}
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
                <FormLabel className="text-sm font-bold ">Email</FormLabel>
                <Input
                  placeholder="Digite seu email"
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
    </div>
  );
};
