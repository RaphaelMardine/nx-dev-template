import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  useToast,
} from '@v4company/ui-components';
import { updateStep } from '../../../../common/services';
import { useCallback, useState } from 'react';
import { buttonDefault, stepsDefault } from '../constants';
import { useLead } from '../hooks';
import { TriangleAlert } from 'lucide-react';

export function AlterStatus() {
  const { lead, refetch } = useLead();
  const nextStep = lead?.steps && stepsDefault[lead.steps].nextStep;
  const disabled = lead?.steps && lead?.steps === 'CONTRACT_SENT';
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { toast } = useToast();

  const handleUpdateStep = useCallback(async () => {
    if (!nextStep) return;
    setLoading(true);

    if (nextStep === 'CONTRACT_SENT') {
      window.open(
        `https://v4company.my.salesforce-sites.com/contratosfechados?recordid=${lead?._id}`
      );
    }

    const response = await updateStep({ id: lead._id, step: nextStep });

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
  }, [lead?._id, nextStep, refetch, toast]);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      modal
    >
      <DialogTrigger disabled={disabled}>
        {nextStep && (
          <Button
            variant="destructive"
            className="rounded-full"
            disabled={disabled}
          >
            {lead?.steps && buttonDefault[nextStep]?.label}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="min-w-[50vw]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-4">
            <TriangleAlert size={20} /> Deseja alterar o status atual?
          </DialogTitle>
          <div className="pt-4 pb-8">
            <p>
              Ao confirmar esta ação o Lead {lead?.lead?.company} terá o status{' '}
              {stepsDefault[lead?.steps || '']?.label} modificado para{' '}
              {stepsDefault[nextStep || '']?.label}.
            </p>
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
              onClick={handleUpdateStep}
            >
              Confirmar alteração
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
