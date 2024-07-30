'use client';

import { UseFormReturn } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
// Shadcn UI import
import { Input } from '../ui/input'; // Shandcn UI Input

type TextInputProps = {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  placeholder: string;
  decimal: number;
  disabled?: boolean;
};

// Brazilian currency config
export const moneyMask = (value: string, decimal: number) => {
  if (!value)
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumSignificantDigits: decimal,
    }).format(0);

  let currentValue = value;

  if (currentValue.indexOf('.') > 0) {
    currentValue = currentValue.replace('.', '');
  }

  if (currentValue.indexOf(',') > 0) {
    currentValue = currentValue.replace(',', '');
  }

  currentValue = currentValue.replace(/\D/g, '');

  const result = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(parseFloat(currentValue) / 100);
  return result;
};

export function MoneyInput(props: TextInputProps) {
  return (
    <FormField
      control={props.form.control}
      name={props.name}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel className="text-sm font-bold whitespace-nowrap">
              {props.label}
            </FormLabel>
            <FormControl>
              <Input
                placeholder={props.placeholder}
                type="text"
                disabled={props.disabled}
                {...field}
                onChange={(ev) => {
                  props?.form?.setValue(props?.name, ev.target.value);
                  field.onChange(moneyMask(ev.target.value, props?.decimal));
                }}
                value={field.value}
              />
            </FormControl>
            {props.form.formState.errors[props.name]?.message && (
              <FormMessage className="text-destructive">
                {props.form.formState.errors[props.name]?.message as string}
              </FormMessage>
            )}
          </FormItem>
        );
      }}
    />
  );
}
