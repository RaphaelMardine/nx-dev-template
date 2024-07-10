import { useLead } from '../hooks';
import { FileText } from 'lucide-react';
import { Card } from './card';

export function Description() {
  const { lead } = useLead();
  return (
    <Card>
      <div className="flex items-center gap-2">
        <FileText size={20} />
        <p className="font-bold">Descrição do lead</p>
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <p>{lead?.lead?.description || '-'}</p>
        </div>
      </div>
    </Card>
  );
}
