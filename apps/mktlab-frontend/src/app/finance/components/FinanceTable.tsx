import {
  Button,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Form,
  FormField,
  FormItem,
  FormLabel,
  MoneyInput,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  TabsList,
  TabsTrigger,
} from '@v4company/ui-components';
import { SlidersHorizontal } from 'lucide-react';
import { AggregatedFranchiseList } from '../../common/services/requests/franchises/getFranchiseList';
import { PeriodPicker } from '../../common/components/PeriodPicker';
import { IFiltersFinance } from '../../common/types/hooks-forms';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import { useCallback } from 'react';
import { ICustomersList } from '../../common/services/requests/customers/getCustomersList';

export const FilterFinance = ({
  franchiseList,
  customerList,
  formFilter,
}: {
  franchiseList: AggregatedFranchiseList[] | undefined;
  customerList: ICustomersList[] | undefined;
  formFilter: UseFormReturn<IFiltersFinance, undefined>;
}) => {
  const onSubmit: SubmitHandler<IFiltersFinance> = useCallback((data) => {
    console.log(data);
  }, []);

  return (
    <div className="flex justify-between w-full">
      <TabsList>
        <TabsTrigger value="invoices">Financeiro</TabsTrigger>
        <TabsTrigger value="units">Unidades</TabsTrigger>
      </TabsList>
      <Form {...formFilter}>
        <form onSubmit={formFilter?.handleSubmit(onSubmit)}>
          <Drawer
            onOpenChange={() => formFilter?.handleSubmit(onSubmit)}
            onClose={formFilter?.handleSubmit(onSubmit)}
          >
            <DrawerTrigger>
              <Button variant={'ghost'}>
                <SlidersHorizontal />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="top-0 right-0 left-auto h-screen mt-0 rounded-lg rounded-r-none lg:w-1/3">
              <DrawerHeader>
                <DrawerTitle>Filtros</DrawerTitle>
                <DrawerDescription>
                  Insira os filtros desejados.
                </DrawerDescription>
                <div className="flex flex-col gap-6 mt-6">
                <FormField
                    control={formFilter.control}
                    name="customer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-bold">
                          Clientes
                        </FormLabel>
                        <Select
                          onValueChange={(value) => field.onChange(value)}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Clientes" />
                          </SelectTrigger>
                          <SelectContent>
                            {customerList?.map(
                              (item: ICustomersList, key: number) => {
                                return (
                                  <SelectItem
                                    value={item?.id}
                                    className="flex flex-col items-start px-4 py-2 teamaspace-y-1"
                                    key={key}
                                  >
                                    <p>{item?.name}</p>
                                  </SelectItem>
                                );
                              }
                            )}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formFilter.control}
                    name="unit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-bold">
                          Unidade
                        </FormLabel>
                        <Select
                          onValueChange={(value) => field.onChange(value)}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Unidades" />
                          </SelectTrigger>
                          <SelectContent>
                            {franchiseList?.map(
                              (item: AggregatedFranchiseList, key: number) => {
                                return (
                                  <SelectItem
                                    value={item?.company?.id}
                                    className="flex flex-col items-start px-4 py-2 teamaspace-y-1"
                                    key={key}
                                  >
                                    <p>{item?.company?.legalName}</p>
                                  </SelectItem>
                                );
                              }
                            )}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  {/* <DrawerTitle>Período</DrawerTitle>
                  <div className="flex justify-between">
                    <FormField
                      control={formFilter.control}
                      name="startDatePeriod"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-bold">
                            De: {field?.value?.toLocaleString() || '-'}
                          </FormLabel>
                          <PeriodPicker
                            field={field}
                            mode="single"
                            placeholder="EX: 01/01/2021"
                          />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={formFilter.control}
                      name="endDatePeriod"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-bold">
                            Até: {field?.value?.toLocaleString() || '-'}
                          </FormLabel>
                          <PeriodPicker
                            field={field}
                            mode="single"
                            placeholder="EX: 01/01/2021"
                          />
                        </FormItem>
                      )}
                    />
                  </div> */}
                  <FormField
                    control={formFilter.control}
                    name="status"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-full">
                          <FormLabel className="text-sm font-bold ">
                            Status de pagamento
                          </FormLabel>
                          <Select
                            onValueChange={(value) => field.onChange(value)}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="PAID">Pago</SelectItem>
                              <SelectItem value="PENDING">Pendente</SelectItem>
                              <SelectItem value="EXPIRED">Expirado</SelectItem>
                              <SelectItem value="OPEN">Em aberto</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      );
                    }}
                  />
                  <div className="flex justify-between gap-6">
                    <MoneyInput
                      form={formFilter}
                      name="minTotalAmount"
                      label="Qual o valor mínimo?"
                      placeholder="R$ 0,00"
                      decimal={2}
                    />
                    <MoneyInput
                      form={formFilter}
                      name="maxTotalAmount"
                      label="Qual o valor máximo?"
                      placeholder="R$ 0,00"
                      decimal={2}
                    />
                  </div>
                  <FormField
                    control={formFilter.control}
                    name="dueDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-bold">
                          Vencimento:
                        </FormLabel>
                        <PeriodPicker
                          field={field}
                          mode="single"
                          placeholder="EX: 01/01/2021"
                        />
                      </FormItem>
                    )}
                  />{' '}
                </div>
              </DrawerHeader>
              <DrawerFooter>
                <Button onClick={formFilter?.handleSubmit(onSubmit)}>Aplicar filtros</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </form>
      </Form>
    </div>
  );
};
