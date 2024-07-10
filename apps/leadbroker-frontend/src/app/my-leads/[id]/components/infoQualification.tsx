import { useLead } from '../hooks';
import { Save } from 'lucide-react';
import { Card } from './card';

export function InfoQualification() {
  const { lead } = useLead();
  return (
    <Card>
      <div className="flex items-center gap-2">
        <Save size={20} />
        <p className="font-bold">Informações da qualificação - Hiperflow</p>
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <div className="flex flex-col w-full gap-1">
            <span className="text-sm font-bold">Investimento em tráfego:</span>
            <span>{lead?.lead?.revenue || '-'}</span>
          </div>
          <div className="flex flex-col w-full gap-1">
            <span className="text-sm font-bold">Investimento em tráfego:</span>
            <span>{lead?.lead?.revenue || '-'}</span>
          </div>
          <div className="flex flex-col w-full gap-1">
            <span className="text-sm font-bold">Cadastro de clientes:</span>
            <span>{lead?.lead?.revenue || '-'}</span>
          </div>
          <div className="flex flex-col w-full gap-1">
            <span className="text-sm font-bold">Descrição CNAE:</span>
            <span>{lead?.lead?.revenue || '-'}</span>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col w-full gap-1">
            <span className="text-sm font-bold">Qtd. de lojas:</span>
            <span>{lead?.lead?.urgencyToStart || '-'}</span>
          </div>
          <div className="flex flex-col w-full gap-1">
            <span className="text-sm font-bold">qtd. de vendedores:</span>
            <span>{lead?.lead?.urgencyToStart || '-'}</span>
          </div>
          <div className="flex flex-col w-full gap-1">
            <span className="text-sm font-bold">Ticket médio:</span>
            <span>{lead?.lead?.channel || '-'}</span>
          </div>
          <div className="flex flex-col w-full gap-1">
            <span className="text-sm font-bold">
              Estrutura atual do marketing:
            </span>
            <span>{lead?.lead?.cnpj || '-'}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
