import { Steps } from '../../../../common';

export const stepsDefault: Record<
  string,
  {
    label: string;
    progress: number;
    nextStep?: Steps;
  }
> = {
  LEAD_PURCHASED: {
    label: 'Lead comprado',
    nextStep: Steps.IN_PROSPECTING,
    progress: 0,
  },
  IN_PROSPECTING: {
    label: 'Em prospecção',
    nextStep: Steps.MEETING_SCHEDULED,
    progress: 25,
  },
  MEETING_SCHEDULED: {
    label: 'Reunião marcada',
    nextStep: Steps.CONTRACT_SENT,
    progress: 50,
  },
  RETURN_MEETING: {
    label: 'Reunião remarcada',
    nextStep: Steps.CONTRACT_SENT,
    progress: 50,
  },
  CONTRACT_SENT: {
    label: 'Contrato enviado',
    nextStep: Steps.ACTIVE_CONTRACT,
    progress: 100,
  },
  ACTIVE_CONTRACT: {
    label: 'Contrato ativo',
    progress: 100,
  },
  LOST_LEAD: {
    label: 'Lead perdido',
    nextStep: Steps.RETURN_MEETING,
    progress: 100,
  },
};

export const buttonDefault: Record<
  string,
  {
    label: string;
    variant: 'default' | 'secondary' | 'destructive' | 'success';
  }
> = {
  IN_PROSPECTING: {
    label: 'Informar prospecção',
    variant: 'destructive',
  },
  MEETING_SCHEDULED: {
    label: 'Informar reunião agendada',
    variant: 'destructive',
  },
  CONTRACT_SENT: {
    label: 'Requisitar contrato',
    variant: 'destructive',
  },
  ACTIVE_CONTRACT: {
    label: 'Informar contrato ativo',
    variant: 'destructive',
  },
  LOST_LEAD: {
    label: 'Informar lead perdido',
    variant: 'destructive',
  },
  RETURN_MEETING: {
    label: 'Informar reunião remarcada',
    variant: 'destructive',
  },
};
