import { convertCentsToBRL, formatDate, formatTime } from '@v4company/utils';
import { useLead } from '../hooks';
import { Clock3 } from 'lucide-react';

export function HeaderMyLeadsView() {
  const { lead } = useLead();
  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-2">
        <h3>{lead?.lead?.company}</h3>
        <p className="flex items-center gap-1 text-sm">
          <Clock3 size={12} />
          {lead?.winner?.boughtAt && (
            <>
              {formatDate(lead?.winner?.boughtAt)}{' '}
              {formatTime(lead?.winner?.boughtAt)}
            </>
          )}
        </p>
      </div>
      <div className="flex flex-col items-end gap-1 p-2 bg-gray-100 rounded-md">
        <p className="flex items-center gap-1 font-bold">
          Valor pago:
          <span className="text-xl font-bold">
            {convertCentsToBRL(lead?.winner?.value || 0)}
          </span>
        </p>
        <p className="flex items-center gap-1 text-sm">
          Valor utilizado de saldo real:
          <span>{convertCentsToBRL(lead?.winner?.realValue || 0)}</span>
        </p>
        <p className="flex items-center gap-1 text-sm">
          Valor utilizado de bônus:
          <span>{convertCentsToBRL(lead?.winner?.bonus || 0)}</span>
        </p>
      </div>
    </div>
  );
}
