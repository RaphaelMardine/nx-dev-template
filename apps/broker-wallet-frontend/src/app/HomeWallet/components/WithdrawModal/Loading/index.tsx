import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@v4company/ui-components';
import { LoaderCircle } from 'lucide-react';

export const Loading = () => {
  return (
    <>
      <DialogHeader className="relative pt-4 pb-4 pl-6 -m-6 shadow-m">
        <DialogTitle className="flex items-center">
          <h4>Saque</h4>
        </DialogTitle>
      </DialogHeader>
      <div>
        <div className="flex flex-col items-center max-h-screen gap-6 pt-12 pb-20 overflow-y-auto">
          <LoaderCircle
            size={104}
            className="text-green-500 rounded-full animate-spin"
          />
          <p className="text-base font-normal">
            Realizando solicitação de saque
          </p>
          <p className="text-sm font-normal">
            A confirmação pode demorar até 01 minuto
          </p>
        </div>
        <DialogFooter className="absolute bottom-0 left-0 right-0 p-6 mt-6 shadow-m">
          <br />
        </DialogFooter>
      </div>
    </>
  );
};
