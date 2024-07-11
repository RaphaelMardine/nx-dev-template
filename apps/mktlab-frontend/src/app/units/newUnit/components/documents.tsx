import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
  MoneyInput,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@v4company/ui-components';
import { ReactNode, useCallback } from 'react';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import { IDocumentsFormCreation } from '../../../common/types/hooks-forms';
import { NextStepContainer } from './nextStepContainer';
import { PeriodPicker } from '../../../common/components/PeriodPicker';
import { convertCentsToBRL, convertValueToBRL } from '@v4company/utils';

export const Documents = ({
  form,
  setStep,
}: {
  form: UseFormReturn<IDocumentsFormCreation>;
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

  const onSubmit: SubmitHandler<IDocumentsFormCreation> = useCallback(
    async (data: IDocumentsFormCreation) => {
      console.log(data);
    },
    []
  );

  return (
    <Form {...form}>
      <form onSubmit={form?.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-8">
          <Container>
            <h2 className="text-xl font-bold">Detalhes da negociação:</h2>
            <div className="flex flex-col gap-5 mt-5">
              <div className="flex gap-5">
                <GapInput>
                  <FormField
                    control={form.control}
                    name="cof"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>COF</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione uma COF" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="4">4</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  ></FormField>
                </GapInput>
                <GapInput>
                  <MoneyInput 
                  form={form}
                  decimal={2}
                  label='Taxa de treinamento de franquia'
                  name='taxFranchiseTraining'
                  placeholder='EX: R$ 1.000,00'
                  />
                </GapInput>
                <GapInput>
                  <FormField
                    control={form.control}
                    name="startDateFranchise"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-bold">
                          Data de início da franquia
                        </FormLabel>
                        <PeriodPicker
                          field={field}
                          mode="single"
                          placeholder="EX: 01/01/2021"
                        />
                      </FormItem>
                    )}
                  />
                </GapInput>
              </div>
            </div>
          </Container>
        </div>
        <NextStepContainer
          step={2}
          setStep={setStep}
          isValidDocuments={form?.formState?.isValid}
        />
      </form>
    </Form>
  );
};
