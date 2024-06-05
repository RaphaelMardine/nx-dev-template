import { CircleAlert, CircleCheckBig, TriangleAlert } from 'lucide-react';

export const badge: Record<
  string,
  {
    label: string;
    variant: 'default' | 'secondary' | 'destructive' | 'success';
    icon: JSX.Element;
  }
> = {
  FINISHED: {
    label: 'Finalizado',
    variant: 'success',
    icon: <CircleCheckBig size={12} />,
  },
  CANCELED: {
    label: 'Cancelado',
    variant: 'destructive',
    icon: <CircleAlert size={16} />,
  },
  UNDER_ANALYSIS: {
    label: 'Em análise',
    variant: 'secondary',
    icon: <TriangleAlert size={16} />,
  },
};
