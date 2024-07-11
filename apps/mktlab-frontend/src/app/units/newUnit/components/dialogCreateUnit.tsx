import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@v4company/ui-components';
import { useRouter } from 'next/navigation';

export const DialogCreateUnit = ({
  openDialog,
  setOpenDialog,
}: {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter()

  return (
    <Dialog
      open={openDialog}
      modal
      defaultOpen={openDialog}
      onOpenChange={() => setOpenDialog(false)}
    >
      <DialogContent className="flex flex-col items-center">
        <DialogHeader>
          <DialogTitle className="text-center">
            Unidade criada com sucesso
          </DialogTitle>
          <DialogDescription className="text-center">
            A unidade foi criada com sucesso. Você pode acessar a unidade na
            página de unidades.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              type="button"
              variant="destructive"
              onClick={() => router.push('/units')}
            >
              Fechar janela
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
