import { useLead } from '../hooks';
import { BriefcaseBusiness } from 'lucide-react';
import { Card } from './card';

export function AboutCompany() {
  const { lead } = useLead();
  return (
    <Card>
      <div className="flex items-center gap-2">
        <BriefcaseBusiness size={20} />
        <p className="font-bold">Sobre a empresa</p>
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <div className="flex flex-col w-full gap-1">
            <span className="text-sm font-bold">Faturamento:</span>
            <span>{lead?.lead?.revenue || '-'}</span>
          </div>
          <div className="flex flex-col w-full gap-1">
            <span className="text-sm font-bold">Segmento:</span>
            <span>{lead?.lead?.segment || '-'}</span>
          </div>
          <div className="flex flex-col w-full gap-1">
            <span className="text-sm font-bold">Região:</span>
            <span>
              {lead?.location ? (
                <>
                  {lead?.location?.city}/{lead?.location?.state}
                </>
              ) : (
                '-'
              )}
            </span>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col w-full gap-1">
            <span className="text-sm font-bold">Urgência:</span>
            <span>{lead?.lead?.urgencyToStart || '-'}</span>
          </div>
          <div className="flex flex-col w-full gap-1">
            <span className="text-sm font-bold">Canal:</span>
            <span>{lead?.lead?.channel || '-'}</span>
          </div>
          <div className="flex flex-col w-full gap-1">
            <span className="text-sm font-bold">CNPJ:</span>
            <span>{lead?.lead?.cnpj || '-'}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
