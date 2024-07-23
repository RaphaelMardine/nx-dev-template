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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
  useToast,
} from '@v4company/ui-components';
import { updateStep } from '../../../../common/services';
import { useCallback, useState } from 'react';
import { useLead } from '../hooks';
import { TriangleAlert } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z
  .object({
    lostReason: z.string({
      required_error: 'Você precisa selecionar o motivo da perda',
    }),
    description: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.lostReason === 'Outros' && !data.description) {
        return false;
      }
      return true;
    },
    {
      message: 'Você precisa informar uma descrição',
      path: ['description'],
    }
  );

const lostReasons = [
  'Cliente oculto',
  'Sem timing - Tempo indeterminado',
  'Sem timing - Com data para retomada',
  'Lead tem faturamento adequado, mas achou caro',
  'Lead não tem faturamento adequado para venda',
  'Fechou com outra empresa/contratou internamente',
  'Não consegui contato com stakeholder principal',
  'Reclame aqui',
  'Deixou de responder, cadência de follow finalizada',
  'Lead teve algum imprevisto grave (financeiro, pessoal, judicial, etc)',
  'Empresa sem estrutura/MVP',
  'Outros',
];

interface IFormRefundRequest {
  lostReason: string;
  description?: string;
}

export function NotifyLossLead() {
  const { lead, refetch } = useLead();
  const viewButtonLost =
    lead?.steps === 'MEETING_SCHEDULED' || lead?.steps === 'RETURN_MEETING';
  const [isOtherReason, setIsOtherReason] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { toast } = useToast();

  const form = useForm<IFormRefundRequest>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormRefundRequest> = useCallback(
    async (data) => {
      if (!lead?._id) return;

      setLoading(true);

      const lostReason =
        data.lostReason === 'Outros' ? data.description : data.lostReason;

      const response = await updateStep({
        id: lead?._id,
        step: 'LOST_LEAD',
        lostReason,
      });

      setOpen(false);

      if (response.error) {
        toast({
          title: 'Erro',
          description: 'Erro ao atualizar etapa',
          variant: 'destructive',
        });

        setLoading(false);
        return;
      }

      await refetch();
      toast({
        title: 'Sucesso',
        description: 'Estado atualizado com sucesso',
      });

      setLoading(false);
    },
    [lead?._id, refetch, toast]
  );

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      modal
    >
      {viewButtonLost && (
        <DialogTrigger>
          <Button
            variant="destructive"
            className="rounded-full"
          >
            Avisar perda
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="min-w-[50vw]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-4">
            <TriangleAlert size={20} /> Deseja avisar a perda?
          </DialogTitle>
          <div className="pt-4 pb-8">
            <p>Selecione abaixo o motivo da perda do lead</p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="lostReason"
                  render={({ field }) => {
                    return (
                      <FormItem className="w-full">
                        <FormLabel className="text-sm font-bold ">
                          Selecione o motivo da perda*
                        </FormLabel>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            if (value === 'Outros') {
                              setIsOtherReason(true);
                            } else {
                              setIsOtherReason(false);
                            }
                          }}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue
                              placeholder={
                                field.value
                                  ? field.value
                                  : 'Selecione o motivo da perda'
                              }
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {lostReasons.map((reason) => (
                              <SelectItem
                                key={reason}
                                value={reason}
                              >
                                {reason}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {form.formState.errors.lostReason?.message && (
                          <FormMessage className="text-destructive">
                            {form.formState.errors.lostReason?.message}
                          </FormMessage>
                        )}
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => {
                    return (
                      <FormItem
                        className={`w-full ${
                          isOtherReason ? 'opacity-1' : 'opacity-0'
                        }`}
                      >
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
              </form>
            </Form>
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
              disabled={loading}
              onClick={form.handleSubmit(onSubmit)}
            >
              Confirmar
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
