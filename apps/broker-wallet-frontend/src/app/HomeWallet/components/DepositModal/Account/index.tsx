import {
  Button,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@v4company/ui-components';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import { IFormInputs } from '..';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { AccountFields } from '../../AccountFields';

interface AmountProps {
  onSubmit: SubmitHandler<IFormInputs>;
  form: UseFormReturn<IFormInputs>;
  setStepSelect: Dispatch<SetStateAction<string>>;
}

export const Account = ({ onSubmit, form, setStepSelect }: AmountProps) => {
  return (
    <>
      <DialogHeader className="relative pt-4 pb-4 pl-6 -m-6 shadow-m">
        <DialogTitle className="flex items-center">
          <Button
            variant="link"
            onClick={() => setStepSelect('amount')}
            className="pl-0"
          >
            <ChevronLeft size={24} />
          </Button>
          <h4>Depósito</h4>
        </DialogTitle>
      </DialogHeader>
      <div>
        <div className="mt-6 mb-4 -m-6">
          <div className="h-2 bg-black w-[30%] rounded-r-full" />
        </div>
        <AccountFields form={form} />
        <DialogFooter className="absolute bottom-0 left-0 right-0 p-6 mt-6 shadow-m">
          <Button
            type="submit"
            variant="destructive"
            className="flex items-center gap-2 rounded-full"
            onClick={() => {
              form.handleSubmit(onSubmit);
            }}
          >
            Seguir para resumo <ChevronRight size={16} />
          </Button>
        </DialogFooter>
      </div>
    </>
  );
};
