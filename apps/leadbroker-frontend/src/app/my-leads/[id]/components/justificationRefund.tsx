import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@v4company/ui-components';
import { ChevronRight, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { useLead } from '../hooks';

export function JustificationRefund() {
  const [open, setOpen] = useState(false);
  const { lead } = useLead();

  return (
    lead?.refund?.status === 'REJECTED' && (
      <Collapsible
        onOpenChange={setOpen}
        className="p-4 py-0"
      >
        <CollapsibleTrigger className="flex items-center w-full gap-4 text-lg font-bold">
          {open ? <ChevronUp size={24} /> : <ChevronRight size={24} />}
          Justificativa da rejeição
        </CollapsibleTrigger>
        <CollapsibleContent className="flex flex-col gap-2 px-10 pt-2 pb-6">
          <p className="font-bold">Descrição</p>
          <p>{lead?.refund?.description}</p>
        </CollapsibleContent>
      </Collapsible>
    )
  );
}
