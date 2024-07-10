import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
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
  Textarea,
  useToast,
} from '@v4company/ui-components';
import { useLead } from '../hooks';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { maskPhone } from '@v4company/utils';
import { optionsReason } from '../constants';
import {
  IRefundData,
  getSalesManager,
  requestRefund,
} from '../../../../common/services';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { AddFiles } from './addFiles';
import { FileList } from '../../../../common/services';
import { useRouter } from 'next/navigation';

const schema = z.object({
  managerUser: z.object({
    _id: z.string({
      required_error: 'Insira o valor',
    }),
    name: z.string({
      required_error: 'Insira o valor',
    }),
  }),
  reason: z.string({
    required_error: 'Selecione o motivo',
  }),
  description: z.string({
    required_error: 'Insira a descrição',
  }),
  phone: z.string({
    required_error: 'Insira o telefone',
  }),
});

interface IFormRefundRequest {
  managerUser: {
    _id: string;
    name: string;
  };
  reason: string;
  description: string;
  phone: string;
}
export function RequestRefund() {
  const [files, setFiles] = useState<FileList[]>([]);
  const [open, setOpen] = useState(false);
  const { lead } = useLead();
  const disabledRefund =
    !(lead?.steps === 'IN_PROSPECTING' || lead?.steps === 'LEAD_PURCHASED') &&
    !lead?.refund?.status;
  const { toast } = useToast();
  const router = useRouter();

  const { data: salesManagers } = useQuery({
    queryKey: ['get-sales-managers'],
    queryFn: async () => {
      const response = await getSalesManager();
      return response.data;
    },
    enabled: open,
  });

  const form = useForm<IFormRefundRequest>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormRefundRequest> = useCallback(
    async (data) => {
      const body: IRefundData = {
        refundReason: data.reason,
        automaticReject: false, //validar esse campo
        refundValues: {
          depositAmount: lead?.winner?.realValue || 0,
          bonusAmount: lead?.winner?.bonus || 0,
        },
        refundItem: {
          auctionId: lead?._id || '',
          externalId: lead?.externalId || '',
          packId: lead?.packId || '',
          leadName: lead?.lead?.company || '',
          purchasedType: lead?.packId ? 'Pack' : 'Lead',
          purchasedAt: lead?.createdAt || new Date(),
        },
        managerUser: data.managerUser,
        attachments: files,
        refundJustification: {
          reason: data.reason,
          description: data.description,
        },
        requestingUser: {
          phone: data.phone,
        },
        purchasedAt: lead?.createdAt || new Date(),
      };
      const response = await requestRefund(body);

      if (response.error) {
        toast({
          title: 'Erro ao solicitar reembolso',
          variant: 'destructive',
        });
        return;
      }
      toast({
        title: 'Reembolso solicitado com sucesso',
      });
      router.push(`/my-leads/refund/${lead?._id}`);
    },
    [files, lead, router, toast]
  );

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      modal
    >
      {!disabledRefund && (
        <DialogTrigger>
          <Button
            variant="ghost"
            className="rounded-full text-destructive"
            onClick={() => setOpen(true)}
          >
            Solicitar reembolso
          </Button>
        </DialogTrigger>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogContent className="min-w-[70vw]">
            <DialogHeader>
              <DialogTitle>Solicitar reembolso</DialogTitle>
              <div className="flex flex-col justify-between gap-4 lg:flex-row">
                <div className="flex flex-col w-full gap-2 pt-4">
                  <p className="font-bold">Cliente {lead?.lead?.company}</p>
                  <div className="flex flex-col gap-4">
                    <FormField
                      control={form.control}
                      name="managerUser"
                      render={({ field }) => {
                        return (
                          <FormItem className="w-full pr-0 lg:pr-2 lg:w-1/2">
                            <FormLabel className="text-sm font-bold ">
                              Gestor de Vendas Matriz*
                            </FormLabel>
                            <Select
                              onValueChange={(value) => {
                                salesManagers?.map((manager) => {
                                  if (manager._id === value) {
                                    field.onChange(manager);
                                  }
                                });
                              }}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue
                                  placeholder={
                                    field.value?.name
                                      ? field.value.name
                                      : 'Selecione o gestor'
                                  }
                                />
                              </SelectTrigger>
                              <SelectContent>
                                {salesManagers?.map((manager) => (
                                  <SelectItem
                                    key={manager._id}
                                    value={manager._id}
                                  >
                                    {manager.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {form.formState.errors.managerUser?.name
                              ?.message && (
                              <FormMessage className="text-destructive">
                                {
                                  form.formState.errors.managerUser?.name
                                    ?.message
                                }
                              </FormMessage>
                            )}
                          </FormItem>
                        );
                      }}
                    />
                    <div className="flex flex-col gap-4 lg:flex-row">
                      <FormField
                        control={form.control}
                        name="reason"
                        render={({ field }) => {
                          return (
                            <FormItem className="w-full lg:w-1/2">
                              <FormLabel className="text-sm font-bold ">
                                Motivo*
                              </FormLabel>
                              <Select
                                onValueChange={(value) => {
                                  field.onChange(value);
                                }}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue
                                    placeholder={
                                      field.value
                                        ? field.value
                                        : 'Selecione o motivo'
                                    }
                                  />
                                </SelectTrigger>
                                <SelectContent>
                                  {optionsReason.map((reason, index) => (
                                    <SelectItem
                                      key={index}
                                      value={reason.value}
                                    >
                                      {reason.value}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              {form.formState.errors.reason?.message && (
                                <FormMessage className="text-destructive">
                                  {form.formState.errors.reason?.message}
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
                            <FormItem className="w-full lg:w-1/2">
                              <FormLabel className="text-sm font-bold ">
                                Telefone para contato*
                              </FormLabel>
                              <Input
                                placeholder="Digite seu telefone"
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
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => {
                        return (
                          <FormItem className="w-full">
                            <FormLabel className="text-sm font-bold ">
                              Descreva como foi a negociação*
                            </FormLabel>
                            <Textarea
                              placeholder="Digite aqui os detalhes de como foi a negociação"
                              {...field}
                              onChange={field.onChange}
                            />
                            {form.formState.errors.description?.message && (
                              <FormMessage className="text-destructive">
                                {form.formState.errors.description?.message}
                              </FormMessage>
                            )}
                          </FormItem>
                        );
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-col w-full gap-4 lg:w-5/12">
                  <p className="font-bold">Provas para o reembolso</p>
                  <AddFiles
                    files={files}
                    setFiles={setFiles}
                  />
                </div>
              </div>
            </DialogHeader>
            <DialogFooter>
              <div className="flex justify-between w-full">
                <DialogClose>
                  <Button
                    variant="outline"
                    className="rounded-full border-destructive text-destructive"
                  >
                    Cancelar
                  </Button>
                </DialogClose>
                <Button
                  variant="destructive"
                  className="rounded-full"
                  type="submit"
                  onClick={form.handleSubmit(onSubmit)}
                >
                  Enviar para análise
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </form>
      </Form>
    </Dialog>
  );
}
