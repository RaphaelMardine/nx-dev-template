import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@v4company/ui-components';
import { Slash } from 'lucide-react';
import { useRefund } from '../hooks';

export function BreadcrumbMyRefundsView() {
  const { lead } = useRefund();
  return (
    <Breadcrumb className="pt-8 font-sans">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink path="/home">Lead Broker</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink path="/my-leads?tab=LEADS_PURCHASED">
            Meus Leads
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink path="/my-leads?tab=LEADS_REFUNDED">
            Solicitações de reembolso
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage className="font-sans">
            {lead?.lead?.company}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
