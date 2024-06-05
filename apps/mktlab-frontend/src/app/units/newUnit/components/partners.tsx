import {
  Button,
  Checkbox,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Label,
} from '@v4company/ui-components';
import { ReactNode, useCallback } from 'react';
import { maskCep, maskCpf, maskPhone } from '@v4company/utils';
import { foundByZipCode } from '@v4company/services';
import { SubmitHandler, UseFormReturn, useFieldArray } from 'react-hook-form';
import { IPartnerFormCreation } from '../../../common/types/hooks-forms';
import { NextStepContainer } from './nextStepContainer';
import { PeriodPicker } from '../../../common/components/PeriodPicker';

export const Partners = ({
  form,
  setStep,
}: {
  form: UseFormReturn<IPartnerFormCreation>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { fields, append } = useFieldArray({
    control: form.control,
    name: 'partners',
  });

  const Container = ({ children }: { children: ReactNode }) => (
    <div className="w-full p-5 bg-white border border-solid h-max border-color-gray-default">
      {children}
    </div>
  );

  const GapInput = ({ children }: { children: ReactNode }) => (
    <div className="flex flex-col gap-2">{children}</div>
  );

  const submitToFoundByZipCode = async (zipCode: string, index: number) => {
    const response = await foundByZipCode(zipCode);

    form?.setValue(
      `partners.${index}.address.cityPartner`,
      response?.result?.city
    );
    form?.setValue(
      `partners.${index}.address.statePartner`,
      response?.result?.stateShortname
    );
    form?.setValue(
      `partners.${index}.address.districtPartner`,
      response?.result?.district || ''
    );
    form?.setValue(
      `partners.${index}.address.streetPartner`,
      response?.result?.street || ''
    );
    form?.setValue(`partners.${index}.address.countryPartner`, 'Brasil');
    form?.setValue(
      `partners.${index}.address.complementPartner`,
      response?.result?.complement || ''
    );
  };

  const onSubmit: SubmitHandler<IPartnerFormCreation> = useCallback(
    async (data: IPartnerFormCreation) => {
      console.log(data);
    },
    []
  );

  console.log(form?.formState?.errors, 'error partner');
  console.log(form, 'form partner');

  return (
    <Form {...form}>
      <form onSubmit={form?.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-8">
          {fields?.map((field, index: number) => {
            return (
              <Container key={field?.id}>
                <h2 className="text-xl font-bold">Sócio titular</h2>
                <p>
                  Essas informações são referentes a unidade dentro da rede V4
                </p>
                <div className="flex flex-col gap-5 mt-5">
                  <div className="flex gap-5">
                    <GapInput>
                      <FormField
                        control={form.control}
                        key={field?.id}
                        name={`partners.${index}.namePartner`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-bold">
                              Nome
                            </FormLabel>
                            <Input
                              {...field}
                              placeholder="EX: João da Silva"
                            />
                            {form?.formState?.errors?.partners?.[index]
                              ?.namePartner?.message && (
                              <FormMessage className="text-destructive">
                                {
                                  form?.formState?.errors?.partners?.[index]
                                    ?.namePartner?.message
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
                        name={`partners.${index}.telephonePartner`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-bold">
                              Telefone
                            </FormLabel>
                            <Input
                              {...field}
                              onChange={(e) => {
                                const { value } = e.target;
                                field.onChange(maskPhone(value));
                              }}
                              placeholder="EX: (11) 99999-9999"
                            />
                            {form?.formState?.errors?.partners?.[index]
                              ?.telephonePartner?.message && (
                              <FormMessage className="text-destructive">
                                {
                                  form?.formState?.errors?.partners?.[index]
                                    ?.telephonePartner?.message
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
                        name={`partners.${index}.surnamePartner`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-bold">
                              Sobrenome
                            </FormLabel>
                            <Input
                              {...field}
                              placeholder="Sobrenome"
                            />
                            {form.formState.errors.partners?.[index]
                              ?.surnamePartner?.message && (
                              <FormMessage className="text-destructive">
                                {
                                  form.formState.errors.partners?.[index]
                                    ?.surnamePartner?.message
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
                        name={`partners.${index}.birthdayPartner`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-bold">
                              Data de nascimento
                            </FormLabel>
                            <PeriodPicker
                              field={field}
                              mode="single"
                              placeholder="Selecione sua data de nascimento"
                            />
                            {form.formState.errors.partners?.[index]
                              ?.birthdayPartner?.message && (
                              <FormMessage className="text-destructive">
                                {
                                  form.formState.errors.partners?.[index]
                                    ?.birthdayPartner?.message
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
                        name={`partners.${index}.emailPartner`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-bold">
                              E-mail pessoal
                            </FormLabel>
                            <Input
                              {...field}
                              placeholder="EX: exemplo@exemplo.com"
                            />
                            {form.formState.errors.partners?.[index]
                              ?.emailPartner?.message && (
                              <FormMessage className="text-destructive">
                                {
                                  form.formState.errors.partners?.[index]
                                    ?.emailPartner?.message
                                }
                              </FormMessage>
                            )}
                          </FormItem>
                        )}
                      />
                    </GapInput>
                  </div>
                  <div className="flex gap-5 ">
                    <GapInput>
                      <FormField
                        control={form.control}
                        name={`partners.${index}.motherNamePartner`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-bold">
                              Nome da mãe
                            </FormLabel>
                            <Input
                              {...field}
                              placeholder="EX: Maria da Silva"
                            />
                            {form?.formState?.errors?.partners?.[index]
                              ?.motherNamePartner?.message && (
                              <FormMessage className="text-destructive">
                                {
                                  form?.formState?.errors?.partners?.[index]
                                    ?.motherNamePartner?.message
                                }
                              </FormMessage>
                            )}
                          </FormItem>
                        )}
                      />
                    </GapInput>
                  </div>
                </div>
                <h2 className="mt-5 text-xl font-bold">Endereço</h2>
                <div className="flex flex-col gap-5 mt-5">
                  <div className="flex gap-5">
                    <GapInput>
                      <FormField
                        control={form.control}
                        name={`partners.${index}.address.zipCodePartner`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-bold">
                              CEP
                            </FormLabel>
                            <Input
                              {...field}
                              onChange={(e) => {
                                const { value } = e.target;
                                field.onChange(maskCep(value));
                              }}
                              onBlur={() =>
                                submitToFoundByZipCode(field?.value, 0)
                              }
                              placeholder="EX: 00000-000"
                            />
                            {form?.formState?.errors?.partners?.[index]?.address
                              ?.zipCodePartner?.message && (
                              <FormMessage className="text-destructive">
                                {
                                  form?.formState?.errors?.partners?.[index]
                                    ?.address?.zipCodePartner?.message
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
                        name={`partners.${index}.address.countryPartner`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-bold">
                              País
                            </FormLabel>
                            <Input
                              {...field}
                              placeholder="EX: Brasil"
                              value={'Brasil'}
                              disabled
                            />
                          </FormItem>
                        )}
                      />
                    </GapInput>
                    <GapInput>
                      <FormField
                        control={form.control}
                        name={`partners.${index}.address.cityPartner`}
                        render={({ field }) => (
                          <FormItem>
                            <Label>Cidade</Label>
                            <Input
                              {...field}
                              placeholder="EX: São Paulo"
                            />
                            {form?.formState?.errors?.partners?.[index]?.address
                              ?.cityPartner?.message && (
                              <FormMessage className="text-destructive">
                                {
                                  form?.formState?.errors?.partners?.[index]
                                    ?.address?.cityPartner?.message
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
                        name={`partners.${index}.address.statePartner`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-bold">
                              Estado
                            </FormLabel>
                            <Input
                              {...field}
                              placeholder="EX: SP"
                            />
                            {form?.formState?.errors?.partners?.[index]?.address
                              ?.statePartner?.message && (
                              <FormMessage className="text-destructive">
                                {
                                  form?.formState?.errors?.partners?.[index]
                                    ?.address?.statePartner?.message
                                }
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
                        name={`partners.${index}.address.streetPartner`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-bold">
                              Rua
                            </FormLabel>
                            <Input
                              {...field}
                              placeholder="EX: Rua dos Bobos"
                            />
                            {form?.formState?.errors?.partners?.[index]?.address
                              ?.streetPartner?.message && (
                              <FormMessage className="text-destructive">
                                {
                                  form?.formState?.errors?.partners?.[index]
                                    ?.address?.streetPartner?.message
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
                        name={`partners.${index}.address.districtPartner`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-bold">
                              Bairro
                            </FormLabel>
                            <Input
                              {...field}
                              placeholder="EX: Vila do Chaves"
                            />
                            {form?.formState?.errors?.partners?.[index]?.address
                              ?.districtPartner?.message && (
                              <FormMessage className="text-destructive">
                                {
                                  form?.formState?.errors?.partners?.[index]
                                    ?.address?.districtPartner?.message
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
                        name={`partners.${index}.address.numberPartner`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-bold">
                              Número
                            </FormLabel>
                            <Input
                              {...field}
                              placeholder="EX: 1234"
                            />
                            {form?.formState?.errors?.partners?.[index]?.address
                              ?.numberPartner?.message && (
                              <FormMessage className="text-destructive">
                                {
                                  form?.formState?.errors?.partners?.[index]
                                    ?.address?.numberPartner?.message
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
                        name={`partners.${index}.address.complementPartner`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-bold">
                              Complemento
                            </FormLabel>
                            <Input
                              {...field}
                              placeholder="EX: Casa 2"
                            />
                            {form?.formState?.errors?.partners?.[index]?.address
                              ?.complementPartner?.message && (
                              <FormMessage className="text-destructive">
                                {
                                  form?.formState?.errors?.partners?.[index]
                                    ?.address?.complementPartner?.message
                                }
                              </FormMessage>
                            )}
                          </FormItem>
                        )}
                      />
                    </GapInput>
                  </div>
                </div>
                <h2 className="mt-5 text-xl font-bold">Documentos</h2>
                <div className="flex flex-col gap-5 mt-5">
                  <div className="flex gap-5">
                    <GapInput>
                      <div className="flex gap-2">
                        <FormField
                          control={form.control}
                          name={`partners.${index}.rgPartner`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-bold">
                                RG
                              </FormLabel>
                              <Input
                                {...field}
                                placeholder="EX: 00.000.000-0"
                              />
                              {form?.formState?.errors?.partners?.[index]
                                ?.rgPartner?.message && (
                                <FormMessage className="text-destructive">
                                  {
                                    form?.formState?.errors?.partners?.[index]
                                      ?.rgPartner?.message
                                  }
                                </FormMessage>
                              )}
                            </FormItem>
                          )}
                        />
                      </div>
                    </GapInput>
                    <GapInput>
                      <div className="flex gap-2">
                        <FormField
                          control={form.control}
                          name={`partners.${index}.cpfPartner`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-bold">
                                CPF
                              </FormLabel>
                              <Input
                                {...field}
                                onChange={(e) => {
                                  const { value } = e.target;
                                  field.onChange(maskCpf(value));
                                }}
                                placeholder="EX: 000.000.000-00"
                              />
                              {form?.formState?.errors?.partners?.[index]
                                ?.cpfPartner?.message && (
                                <FormMessage className="text-destructive">
                                  {
                                    form?.formState?.errors?.partners?.[index]
                                      ?.cpfPartner?.message
                                  }
                                </FormMessage>
                              )}
                            </FormItem>
                          )}
                        />
                      </div>
                    </GapInput>
                  </div>
                  <div className="flex flex-col gap-5 mt-5">
                    <h2 className="text-xl font-bold">Empresariais</h2>
                    <div className="flex gap-5">
                      <GapInput>
                        <FormField
                          control={form.control}
                          name={`partners.${index}.businessEmailPartner`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-bold">
                                E-mail
                              </FormLabel>
                              <Input
                                {...field}
                                placeholder="EX: exemplo@v4company.com"
                              />
                              {form?.formState?.errors?.partners?.[index]
                                ?.businessEmailPartner?.message && (
                                <FormMessage className="text-destructive">
                                  {
                                    form?.formState?.errors?.partners?.[index]
                                      ?.businessEmailPartner?.message
                                  }
                                </FormMessage>
                              )}
                            </FormItem>
                          )}
                        />
                      </GapInput>
                    </div>
                    <div className="flex items-center gap-4">
                      <Checkbox />
                      <p>Representante legal</p>
                    </div>
                  </div>
                </div>
              </Container>
            );
          })}
          <Button
            variant={'default'}
            className="w-fit"
            onClick={() =>
              append({
                address: {
                  cityPartner: '',
                  complementPartner: '',
                  countryPartner: '',
                  districtPartner: '',
                  numberPartner: '',
                  statePartner: '',
                  streetPartner: '',
                  zipCodePartner: '',
                },
                birthdayPartner: new Date(),
                businessEmailPartner: '',
                cpfPartner: '',
                emailPartner: '',
                motherNamePartner: '',
                namePartner: '',
                rgPartner: '',
                surnamePartner: '',
                telephonePartner: '',
              })
            }
          >
            Adicionar novo sócio
          </Button>
        </div>
        <NextStepContainer
          step={1}
          setStep={setStep}
          isValidPartner={form?.formState?.isValid}
        />
      </form>
    </Form>
  );
};
