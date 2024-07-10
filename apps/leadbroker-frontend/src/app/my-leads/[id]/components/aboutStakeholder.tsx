import { useLead } from '../hooks';
import { Copy, User } from 'lucide-react';
import { Card } from './card';
import { useToast } from '@v4company/ui-components';

export function AboutStakeholder() {
  const { lead } = useLead();
  const { toast } = useToast();

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: `${message} copiado`,
      description: `O ${message} foi copiado para a área de transferência`,
    });
  };
  return (
    <Card>
      <div className="flex items-center gap-2">
        <User size={20} />
        <p className="font-bold">Sobre o stakeholder principal</p>
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <div className="flex flex-col w-full gap-1">
            <span className="text-sm font-bold">Nome do contato:</span>
            <span>{lead?.lead?.name || '-'}</span>
          </div>
          <div className="flex flex-col w-full gap-1">
            <span className="text-sm font-bold">E-mail:</span>
            {lead?.lead?.email ? (
              <span
                onClick={() => copyToClipboard(lead?.lead?.email, 'e-mail')}
                className="flex items-center gap-2 cursor-pointer"
              >
                {lead?.lead?.email} <Copy size={14} />
              </span>
            ) : (
              '-'
            )}
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col w-full gap-1">
            <span className="text-sm font-bold">Cargo:</span>
            <span>{lead?.lead?.companyPosition || '-'}</span>
          </div>
          <div className="flex flex-col w-full gap-1">
            <span className="text-sm font-bold">Telefone:</span>
            {lead?.lead?.tel ? (
              <span
                onClick={() => copyToClipboard(lead?.lead?.tel, 'telefone')}
                className="flex items-center gap-2 cursor-pointer"
              >
                {lead?.lead?.tel} <Copy size={14} />
              </span>
            ) : (
              '-'
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
