'use client';
import React, { ReactNode } from 'react';
import { Textarea } from '@v4company/ui-components/components/ui/text-area';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@v4company/ui-components';
import { Label } from '@v4company/ui-components';
import { Plus, Check } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { IUnitDeactivation } from '../deactivateUnit/[id]/page';
import { useState } from 'react';
import {
  FormField,
  FormItem,
  FormMessage,
  Input,
} from '@v4company/ui-components';

const Container = ({ children }: { children: ReactNode }) => (
  <div className="w-full p-5 bg-white border border-solid rounded-lg h-max border-color-gray-default">
    {children}
  </div>
);

const FlexBox = ({ children }: { children: ReactNode }) => (
  <div className="flex gap-10 ">{children}</div>
);

const DeactivateUnitForm = ({
  form,
}: {
  form: UseFormReturn<IUnitDeactivation>;
}) => {
  const [fileSubmitted, setFileSubmitted] = useState(false);
  return (
    <>
      <h2 className="pt-4 text-2xl font-bold">Documentação</h2>
      <Container>
        <FlexBox>
          <div className="w-full h-48">
            <h3 className="mb-2 font-bold text-md">Motivo da desativação *</h3>
            <FormField
              disabled
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="h-full">
                  <Textarea
                    {...field}
                    onChange={(e) => {
                      const { value } = e.target;
                      field.onChange(value);
                    }}
                    className="h-4/5"
                    placeholder="Descreva os motivos da desativação."
                  />
                  {form.formState.errors.description?.message && (
                    <FormMessage className="text-destructive">
                      {form.formState.errors.description?.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            ></FormField>
          </div>
        </FlexBox>
        <FlexBox>
          <div className="w-full h-48">
            <h3 className="mt-6 mb-2 text-2xl font-bold">
              Adicionar documento de negociação
            </h3>
            <span>Adicione aqui o documento da negociação.</span>
            <div className="flex gap-5 mt-4">
              <div className="flex flex-col w-1/4 h-20 justify-evenly">
                <Label className="mb-2">Tipo de documento *</Label>
                <FormField
                  control={form.control}
                  name="documentType"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        disabled
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione o tipo de documento" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                          <SelectItem value="Saturn">Saturn</SelectItem>
                          <SelectItem value="Uranus">Uranus</SelectItem>
                          <SelectItem value="Pluto">Pluto</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="h-5">
                        {form.formState.errors.documentType?.message && (
                          <FormMessage className="text-destructive">
                            {form.formState.errors.documentType?.message}
                          </FormMessage>
                        )}
                      </div>
                    </FormItem>
                  )}
                ></FormField>
              </div>
              <div className="flex flex-col justify-between w-1/4 opacity-50">
                <div className="relative w-full h-full">
                  <div className="absolute flex items-center justify-center w-full h-full gap-1 -translate-x-1/2 -translate-y-1/2 border-2 border-dashed top-1/2 left-1/2 rounded-xl border-slate-300">
                    {fileSubmitted ? (
                      <>
                        <Check />
                        <span>Documento adicionado</span>
                      </>
                    ) : (
                      <>
                        <Plus />
                        <span>Adicionar documento</span>
                      </>
                    )}
                  </div>
                  <FormField
                    control={form.control}
                    name="document"
                    render={({ field }) => (
                      <FormItem className="h-full">
                        <Input
                          type="file"
                          className="w-full h-full border-2 border-dashed opacity-0 hover:cursor-pointer"
                          onChange={(e) => {
                            const { files } = e.target;

                            if (files) {
                              field.onChange(files[0]);
                              setFileSubmitted(true);
                            }
                          }}
                        ></Input>
                        {form.formState.errors.document?.message && (
                          <FormMessage className="mt-4 text-destructive">
                            {form.formState.errors.document?.message}
                          </FormMessage>
                        )}
                      </FormItem>
                    )}
                  ></FormField>
                </div>
              </div>
            </div>
          </div>
        </FlexBox>
      </Container>
    </>
  );
};

export default DeactivateUnitForm;
