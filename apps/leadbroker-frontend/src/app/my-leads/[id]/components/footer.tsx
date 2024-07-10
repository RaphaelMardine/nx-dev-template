import { Button } from '@v4company/ui-components';
import { useRouter } from 'next/navigation';
import { RequestRefund } from './requestRefund';
import { AlterStatus } from './alterStatus';
import { NotifyLossLead } from './notifyLossLead';

export function Footer() {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-between lg:flex-row">
      <RequestRefund />
      <div className="flex gap-4">
        <NotifyLossLead />
        <Button
          variant="outline"
          className="px-12 rounded-full text-destructive border-destructive"
          onClick={() => router.push('/my-leads')}
        >
          Voltar
        </Button>
        <AlterStatus />
      </div>
    </div>
  );
}
