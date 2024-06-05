import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@v4company/ui-components';
import { maskCep, maskCnpj } from '@v4company/utils';
import { ReactNode, useCallback } from 'react';
import { foundByZipCode } from '@v4company/services';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import { IUnitFormCreation } from '../../../../common/types/hooks-forms';
import { NextStepContainer } from './nextStepContainer';
import { PeriodPicker } from '../../../../common/components/PeriodPicker';

export const UnitIdentification = ({
  form,
  setStep,
}: {
  form: UseFormReturn<IUnitFormCreation>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const Container = ({ children }: { children: ReactNode }) => (
    <div className="w-full p-5 bg-white border border-solid h-max border-color-gray-default">
      {children}
    </div>
  );

  const GapInput = ({ children }: { children: ReactNode }) => (
    <div className="flex flex-col gap-2">{children}</div>
  );

  const submitToFoundByZipCode = async (zipCode: string) => {
    const response = await foundByZipCode(zipCode);

    form?.setValue('address.city', response?.result?.city);
    form?.setValue('address.state', response?.result?.stateShortname);
    form?.setValue('address.district', response?.result?.district || '');
    form?.setValue('address.street', response?.result?.street || '');
    form?.setValue('address.country', 'Brasil');
    form?.setValue('address.complement', response?.result?.complement || '');
  };

  const onSubmit: SubmitHandler<IUnitFormCreation> = useCallback(
    async (data: IUnitFormCreation) => {
      console.log(data);
    },
    []
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-8">
          <Container>
            <h2 className="text-xl font-bold">Dados da empresa:</h2>
            <p>
              Informações cadastrais de pessoa jurídica de acordo com o Cadastro
              Nacional de Pessoas Jurídicas (CNPJ)
            </p>
            <div className="flex flex-col gap-5 mt-5">
              <div className="flex gap-5">
                <GapInput>
                  <FormField
                    control={form.control}
                    name="cnpj"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-bold ">
                          CNPJ
                        </FormLabel>
                        <Input
                          {...field}
                          onChange={(e) => {
                            const { value } = e.target;
                            field.onChange(maskCnpj(value));
                          }}
                          placeholder="CNPJ"
                        />
                        {form.formState.errors.cnpj?.message && (
                          <FormMessage className="text-destructive">
                            {form.formState.errors.cnpj?.message}
                          </FormMessage>
                        )}
                      </FormItem>
                    )}
                  />
                </GapInput>
                <GapInput>
                  <FormField
                    control={form.control}
                    name="fantasyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-bold ">
                          Nome fantasia
                        </FormLabel>
                        <Input
                          {...field}
                          placeholder="Nome fantasia"
                        />
                        {form.formState.errors.fantasyName?.message && (
                          <FormMessage className="text-destructive">
                            {form.formState.errors.fantasyName?.message}
                          </FormMessage>
                        )}
                      </FormItem>
                    )}
                  />
                </GapInput>
                <GapInput>
                  <FormField
                    control={form.control}
                    name="socialName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-bold ">
                          Razão social
                        </FormLabel>
                        <Input
                          {...field}
                          placeholder="Razão social"
                        />
                        {form.formState.errors.socialName?.message && (
                          <FormMessage className="text-destructive">
                            {form.formState.errors.socialName?.message}
                          </FormMessage>
                        )}
                      </FormItem>
                    )}
                  />
                </GapInput>
                <GapInput>
                  <FormField
                    control={form.control}
                    name="startFundation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-bold">
                          Data de fundação
                        </FormLabel>
                        <PeriodPicker
                          field={field}
                          mode="single"
                          placeholder="Selecione a data"
                        />
                        {/* {form.formState.errors.startFundation?.message && (
                      <FormMessage className="text-destructive">
                        {form.formState.errors.startFundation?.message}
                      </FormMessage>
                    )} */}
                      </FormItem>
                    )}
                  />
                </GapInput>
              </div>
              <div className="flex gap-5 ">
                <GapInput>
                  <FormField
                    control={form.control}
                    name="businessType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-bold">
                          Tipo de negócio
                        </FormLabel>
                        <Input
                          {...field}
                          placeholder="Tipo de negócio"
                        />
                        {form.formState.errors.businessType?.message && (
                          <FormMessage className="text-destructive">
                            {form.formState.errors.businessType?.message}
                          </FormMessage>
                        )}
                      </FormItem>
                    )}
                  />
                </GapInput>
                <GapInput>
                  <FormField
                    control={form.control}
                    name="cnae"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-bold">
                          CNAE
                        </FormLabel>
                        <Input
                          {...field}
                          placeholder="CNAE"
                        />
                        {form.formState.errors.cnae?.message && (
                          <FormMessage className="text-destructive">
                            {form.formState.errors.cnae?.message}
                          </FormMessage>
                        )}
                      </FormItem>
                    )}
                  />
                </GapInput>
                <GapInput>
                  <FormField
                    control={form.control}
                    name="enterpriseType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-bold">
                          Tipo de empresa
                        </FormLabel>
                        <Input
                          {...field}
                          placeholder="Tipo de empresa"
                        />
                        {form.formState.errors.enterpriseType?.message && (
                          <FormMessage className="text-destructive">
                            {form.formState.errors.enterpriseType?.message}
                          </FormMessage>
                        )}
                      </FormItem>
                    )}
                  />
                </GapInput>
                <GapInput>
                  <FormField
                    control={form.control}
                    name="taxRegime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-bold">
                          Regime Tributário
                        </FormLabel>
                        <Input
                          {...field}
                          placeholder="Regime Tributário"
                        />
                        {form.formState.errors.taxRegime?.message && (
                          <FormMessage className="text-destructive">
                            {form.formState.errors.taxRegime?.message}
                          </FormMessage>
                        )}
                      </FormItem>
                    )}
                  />
                </GapInput>
              </div>
            </div>
          </Container>
          <Container>
            <h2 className="text-xl font-bold">Endereço:</h2>
            <p>
              Informações cadastrais de pessoa jurídica de acordo com o Cadastro
              Nacional de Pessoas Jurídicas (CNPJ)
            </p>
            <div className="flex flex-col gap-5 mt-5">
              <div className="flex gap-5">
                <GapInput>
                  <FormField
                    control={form.control}
                    name="address.zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-bold">CEP</FormLabel>
                        <Input
                          {...field}
                          onChange={(e) => {
                            const { value } = e.target;
                            field.onChange(maskCep(value));
                          }}
                          onBlur={() => submitToFoundByZipCode(field?.value)}
                          placeholder="CEP"
                        />
                        {form?.formState?.errors?.address?.zipCode?.message && (
                          <FormMessage className="text-destructive">
                            {form?.formState?.errors?.address?.zipCode?.message}
                          </FormMessage>
                        )}
                      </FormItem>
                    )}
                  />
                </GapInput>
                <GapInput>
                  <FormField
                    control={form.control}
                    name="address.country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-bold">
                          País
                        </FormLabel>
                        <Input
                          {...field}
                          value={'Brasil'}
                          placeholder="País"
                          disabled
                        />
                      </FormItem>
                    )}
                  />
                </GapInput>
                <GapInput>
                  <FormField
                    control={form.control}
                    name="address.city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-bold">
                          Cidade
                        </FormLabel>
                        <Input
                          {...field}
                          placeholder="Cidade"
                        />
                        {form?.formState?.errors?.address?.city?.message && (
                          <FormMessage className="text-destructive">
                            {form?.formState?.errors?.address.city?.message}
                          </FormMessage>
                        )}
                      </FormItem>
                    )}
                  />
                </GapInput>
                <GapInput>
                  <FormField
                    control={form.control}
                    name="address.state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-bold">
                          Estado
                        </FormLabel>
                        <Input
                          {...field}
                          placeholder="Estado"
                        />
                        {form?.formState?.errors?.address?.state?.message && (
                          <FormMessage className="text-destructive">
                            {form?.formState?.errors?.address?.state?.message}
                          </FormMessage>
                        )}
                      </FormItem>
                    )}
                  />
                </GapInput>
              </div>
              <div className="flex gap-5">
                <GapInput>
                  <FormField
                    control={form.control}
                    name="address.street"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-bold">Rua</FormLabel>
                        <Input
                          {...field}
                          placeholder="Rua"
                        />
                        {form?.formState?.errors?.address?.street?.message && (
                          <FormMessage className="text-destructive">
                            {form?.formState?.errors?.address?.street?.message}
                          </FormMessage>
                        )}
                      </FormItem>
                    )}
                  />
                </GapInput>
                <GapInput>
                  <FormField
                    control={form.control}
                    name="address.district"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-bold">
                          Bairro
                        </FormLabel>
                        <Input
                          {...field}
                          placeholder="Bairro"
                        />
                        {form?.formState?.errors?.address?.district
                          ?.message && (
                          <FormMessage className="text-destructive">
                            {
                              form?.formState?.errors?.address?.district
                                ?.message
                            }
                          </FormMessage>
                        )}
                      </FormItem>
                    )}
                  />
                </GapInput>
                <GapInput>
                  <FormField
                    control={form.control}
                    name="address.number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-bold">
                          Número
                        </FormLabel>
                        <Input
                          {...field}
                          placeholder="Número"
                        />
                        {form?.formState?.errors?.address?.number?.message && (
                          <FormMessage className="text-destructive">
                            {form.formState?.errors?.address?.number?.message}
                          </FormMessage>
                        )}
                      </FormItem>
                    )}
                  />
                </GapInput>
                <GapInput>
                  <FormField
                    control={form.control}
                    name="address.complement"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-bold">
                          Complemento
                        </FormLabel>
                        <Input
                          {...field}
                          placeholder="Complemento"
                        />
                        {form?.formState?.errors?.address?.complement
                          ?.message && (
                          <FormMessage className="text-destructive">
                            {
                              form?.formState?.errors?.address?.complement
                                ?.message
                            }
                          </FormMessage>
                        )}
                      </FormItem>
                    )}
                  />
                </GapInput>
              </div>
            </div>
          </Container>
        </div>
        <NextStepContainer
          step={0}
          setStep={setStep}
          isValidUnitIdentification={form?.formState?.isValid}
        />
      </form>
    </Form>
  );
};
