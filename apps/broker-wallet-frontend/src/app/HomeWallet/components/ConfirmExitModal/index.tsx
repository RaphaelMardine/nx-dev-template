import { DialogDescription } from '@radix-ui/react-dialog';
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@v4company/ui-components';
import { TriangleAlert } from 'lucide-react';

interface DepositModalProps {
  onClose: () => void;
  isOpen: boolean;
  onHandleCancel: () => void;
  onHandleConfirm: () => void;
}

export const ConfirmExitModal = ({
  onClose,
  onHandleCancel,
  onHandleConfirm,
  isOpen,
}: DepositModalProps) => {
  return (
    <Dialog
      onOpenChange={onClose}
      open={isOpen}
      modal
      defaultOpen={isOpen}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 pb-4 text-xl font-bold">
            <TriangleAlert /> Tem certeza disto?
          </DialogTitle>
          <DialogDescription className="pb-8">
            Você possui informações preenchidas para realizar o saque, caso saia
            do fluxo perderá essas informações!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex justify-between w-full">
            <Button
              variant="link"
              className="border-0 rounded-full"
              onClick={() => {
                onHandleCancel();
              }}
            >
              Não, voltar ao preenchimento
            </Button>
            <Button
              variant="destructive"
              className="rounded-full"
              onClick={() => {
                onHandleConfirm();
              }}
            >
              Sim, quero sair
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
