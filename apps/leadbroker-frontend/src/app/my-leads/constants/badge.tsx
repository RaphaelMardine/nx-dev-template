import { CircleAlert, CircleCheckBig, TriangleAlert } from 'lucide-react';

export const badge: Record<
  string,
  {
    label: string;
    variant:
      | 'default'
      | 'secondary'
      | 'destructive'
      | 'success'
      | 'warning'
      | 'info';
    icon?: JSX.Element;
  }
> = {
  LEAD_PURCHASED: {
    label: 'Lead comprado',
    variant: 'warning',
  },
  IN_PROSPECTING: {
    label: 'Lead em prospecção',
    variant: 'secondary',
    icon: <CircleCheckBig size={12} />,
  },
  MEETING_SCHEDULED: {
    label: 'Reunião marcada',
    variant: 'info',
    icon: <TriangleAlert size={12} />,
  },
  RETURN_MEETING: {
    label: 'Reunião remarcada',
    variant: 'info',
    icon: <TriangleAlert size={12} />,
  },
  CONTRACT_SENT: {
    label: 'Contrato enviado',
    variant: 'success',
    icon: <CircleCheckBig size={12} />,
  },
  ACTIVE_CONTRACT: {
    label: 'Contrato ativo',
    variant: 'success',
    icon: <CircleCheckBig size={12} />,
  },
  LOST_LEAD: {
    label: 'Lead perdido',
    variant: 'destructive',
    icon: <CircleAlert size={12} />,
  },
  // type of refund
  WAITING: {
    label: 'Aguardando',
    variant: 'secondary',
    icon: <TriangleAlert size={12} />,
  },
  UNDER_ANALYSIS: {
    label: 'Em análise',
    variant: 'warning',
    icon: <TriangleAlert size={12} />,
  },
  REJECTED: {
    label: 'Rejeitado',
    variant: 'destructive',
    icon: <CircleAlert size={12} />,
  },
  APPROVED: {
    label: 'Aprovado',
    variant: 'success',
    icon: <CircleCheckBig size={12} />,
  },
};
