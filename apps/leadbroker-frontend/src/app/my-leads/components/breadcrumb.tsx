import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@v4company/ui-components';
import { Slash } from 'lucide-react';

export function BreadcrumbMyLeads() {
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
          <BreadcrumbPage className="font-sans">Meus Leads</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
